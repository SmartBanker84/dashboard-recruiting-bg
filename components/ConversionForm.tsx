'use client';

import { useFormState } from 'react-dom';
import { convertCandidate } from '@/app/dashboard/recruiting/overview/actions';

const initialState = { success: false, error: null };

export default function ConversionForm({ id }: { id: string }) {
  const convert = async (_prevState: any, formData: FormData) => {
    const id = formData.get('id') as string;
    try {
      await convertCandidate(id);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  };

  const [state, formAction] = useFormState(convert, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Converti
      </button>
      {state.error && <p className="text-red-500 mt-1 text-sm">{state.error}</p>}
    </form>
  );
}
