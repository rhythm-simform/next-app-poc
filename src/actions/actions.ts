'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;

  try {
    // update database
    await prisma.post.create({
      data: {
        title,
        body,
      },
    });

    // revalidate
    // revalidatePath('/create-post');

    return {
      ...prevState,
      success: true,
      message: 'Post created successfully!',
    };
  } catch (error) {
    console.error(error);

    // Return error state
    return {
      ...prevState,
      success: false,
      message: 'Failed to create post',
    };
  }
}
