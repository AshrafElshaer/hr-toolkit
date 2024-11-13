import { createBrowserClient } from "@/lib/supabase/browser";
import { FileOptions } from "@supabase/storage-js";

type UploadProps = {
  path: string;
  file: File;
  bucket: string;
};

export async function uploadFile({ path, file, bucket }: UploadProps) {
  const supabase = createBrowserClient();
  return await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600000000",
    upsert: true,
  });
}

export async function uploadUserAvatar(userId: string, file: File) {
  const supabase = createBrowserClient();
  const { data, error } = await uploadFile({
    path: userId,
    file,
    bucket: "avatars",
  });
  if (error) {
    throw new Error(error.message);
  }
  return supabase.storage.from("avatars").getPublicUrl(data.path);
}
