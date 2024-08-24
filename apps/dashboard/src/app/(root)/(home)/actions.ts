"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { authAction } from "@/lib/safe-action";
import notesMutations from "@hr-toolkit/supabase/notes-mutations";
import eventsMutations from "@hr-toolkit/supabase/events-mutations";
import attendanceMutations from "@hr-toolkit/supabase/attendance-mutations";
import { noteSchema, updateNoteSchema } from "@/lib/validations/notes";
import { eventsSchema } from "@/lib/validations/events";
import { z } from "zod";

export const createNoteAction = authAction
  .schema(noteSchema)
  .action(async ({ ctx: { supabase, user }, parsedInput }) => {
    const { id, created_at, updated_at, ...newNote } = parsedInput;
    const { data, error } = await notesMutations.create(supabase, {
      ...newNote,
      user_id: user.id,
    });
    if (error) throw new Error(error.message);
    revalidatePath("/");
    return data.id;
  });

export const updateNoteAction = authAction
  .schema(updateNoteSchema)
  .action(
    async ({ ctx, parsedInput }) => {
      const { supabase, user } = ctx;

      const { data, error } = await notesMutations.update(supabase, {
        ...parsedInput,
        user_id: user.id,
      });
      if (error) throw new Error(error.message);

      revalidatePath("/");

      return data.id;
    },
  );

export const deleteNoteAction = authAction
  .schema(z.object({
    id: z.string().uuid(),
  }))
  .action(
    async ({ ctx: { supabase }, parsedInput }) => {
      const { data, error } = await notesMutations.delete(
        supabase,
        parsedInput.id,
      );
      if (error) {
        throw new Error(error.message);
      }
      revalidatePath("/");
      return data;
    },
  );

export const createEventAction = authAction
  .schema(eventsSchema)
  .action(
    async ({ ctx: { supabase, user }, parsedInput }) => {
      const { id, ...newEvent } = parsedInput;

      console.log(newEvent.start_time);

      const { data, error } = await eventsMutations.create(supabase, {
        ...newEvent,
        organizer_id: user.id,
        organization_id: user.organization_id as string,
      });
      if (error) throw new Error(error.message);
      revalidatePath("/");
      return data;
    },
  );

export const updateEventAction = authAction
  .schema(eventsSchema)
  .action(
    async ({ ctx, parsedInput }) => {
      const { supabase } = ctx;
      const { error } = await eventsMutations.update(supabase, {
        ...parsedInput,
        id: parsedInput.id as string,
        organization_id: parsedInput.organization_id as string,
        organizer_id: parsedInput.organizer_id as string,
      });
      if (error) throw new Error(error.message);

      revalidatePath("/");
    },
  );

export const deleteEventAction = authAction
  .schema(eventsSchema.pick({ id: true }))
  .action(
    async ({ ctx, parsedInput }) => {
      const { supabase } = ctx;
      const { error } = await eventsMutations.delete(
        supabase,
        parsedInput.id as string,
      );

      if (error) throw new Error(error.message);

      revalidatePath("/");
    },
  );

export const clockInAction = authAction
  .action(
    async ({ ctx }) => {
      const { supabase, user } = ctx;

      const { data, error } = await attendanceMutations.clockIn(
        supabase,
        user,
      );

      if (error) throw new Error(error.message);

      revalidatePath("/");
      return data;
    },
  );

export const takeBreakAction = authAction
  .schema(z.object({
    attendanceId: z.string(),
  }))
  .action(
    async ({ ctx, parsedInput }) => {
      const { supabase } = ctx;
      const { error } = await attendanceMutations.startBreak(
        supabase,
        parsedInput.attendanceId,
      );

      if (error) throw new Error(error.message);
      revalidatePath("/");
    },
  );
export const endBreakAction = authAction
  .schema(z.object({
    attendanceId: z.string(),
  }))
  .action(
    async ({ ctx, parsedInput }) => {
      const { supabase } = ctx;
      const { error } = await attendanceMutations.endBreak(
        supabase,
        parsedInput.attendanceId,
      );

      if (error) throw new Error(error.message);
      revalidatePath("/");
    },
  );

export const clockOutAction = authAction
  .schema(z.object({
    attendanceId: z.string(),
  }))
  .action(
    async ({ ctx, parsedInput }) => {
      const { supabase } = ctx;
      const { error, data } = await attendanceMutations.clockOut(
        supabase,
        parsedInput.attendanceId,
      );

      if (error) throw new Error(error.message);
      revalidatePath("/");
      return data;
    },
  );
