"use client";
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";
import {
  ImageResizer,
  Placeholder,
  handleCommandNavigation,
} from "novel/extensions";
import React, { useEffect, useState } from "react";
import { defaultExtensions } from "../extensions";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";

import { cn } from "@toolkit/ui/cn";
import { ScrollArea } from "@toolkit/ui/scroll-area";
import { Separator } from "@toolkit/ui/separator";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "./image-upload";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";

const extensions = [
  ...defaultExtensions,
  slashCommand,
  Placeholder.configure({
    placeholder: ({ editor, node, pos, hasAnchor }) => {
      // if (node.type.name === "heading" && pos === 0) {
      //   return "Untitled Note";
      // }

      // if (node.type.name === "heading" && pos !== 0) {
      //   return "What’s the title?";
      // }

      return "Press '/' for commands";
    },
  }),
];

type EditorProp =
  | {
      initialValue?: JSONContent;
      onChange: (value: JSONContent) => void;
      editable?: true;
      asJSON?: true;
    }
  | {
      initialValue?: JSONContent;
      editable: false;
      onChange?: () => void;
    };

const Editor = ({ initialValue, onChange, editable = true }: EditorProp) => {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  return (
    <ScrollArea
      className={cn(
        "flex-1 p-4 border mt-1 rounded-md min-h-[500px]",
        !editable && "border-none",
      )}
    >
      <EditorRoot>
        <EditorContent
          className="h-full"
          {...(initialValue && { initialContent: initialValue })}
          extensions={extensions}
          editable={editable}
          immediatelyRender={false}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class:
                "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
            },
          }}
          onUpdate={({ editor }) => {
            onChange?.(editor.getJSON());
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border  bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className={
                    "flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent "
                  }
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorBubble
            tippyOptions={{
              placement: "bottom",
            }}
            className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border  bg-background shadow-xl"
          >
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />

            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <TextButtons />
            {/* <Separator orientation="vertical" /> */}
            {/* <ColorSelector open={openColor} onOpenChange={setOpenColor} /> */}
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </ScrollArea>
  );
};

export default Editor;
