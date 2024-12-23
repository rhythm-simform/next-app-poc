import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const ParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, 'Invalid ID format'),
});

// Dynamic metadata generation
export async function generateMetadata({ params }: { params: { id: string } }) {
  const validationResult = ParamsSchema.safeParse(params);

  if (!validationResult.success) {
    return {
      title: 'Invalid Post ID',
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.body.slice(0, 160), // Generate a short description from the post body
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const validationResult = ParamsSchema.safeParse(params);

  if (!validationResult.success) {
    throw new Error(
      validationResult.error.errors.map((e) => e.message).join(', ')
    );
  }

  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!post) {
    notFound();
  }

  return (
    <main className="px-7 pt-24 text-center">
      <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
      <p className="max-w-[700px] mx-auto">{post.body}</p>
    </main>
  );
}
