'use client';

import { createPost } from '@/actions/actions';
import { useToast } from '@/hooks/use-toast';
import React, { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export interface InitialState {
  success: boolean | null;
  message: string | null;
}

const initialState: InitialState = {
  success: null,
  message: null,
};

export default function Form() {
  const [state, formAction] = useFormState(createPost, initialState);
  const { toast } = useToast();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      toast({
        className: 'bg-green-800 text-white',
        description: state.message,
      });
    }
  }, [state, state.message, state.success, toast]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col max-w-[400px] mx-auto gap-2 my-10"
    >
      <input
        type="text"
        name="title"
        placeholder="Title for new post"
        className="border rounded px-3 h-10"
        required
      />
      <textarea
        name="body"
        placeholder="Body content for new post"
        className="border rounded px-3 py-2"
        rows={6}
        required
      />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`
        h-10 px-5 rounded text-white 
        ${pending ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500'}
        flex items-center justify-center gap-2
      `}
    >
      {pending && (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      )}
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}
