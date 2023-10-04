import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z.string().nonempty().min(3, { message: 'Please enter minimum 3 charaters' }),
  accountId : z.string(),
});

export const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: 'Please enter minimum 3 charaters' }),
});


