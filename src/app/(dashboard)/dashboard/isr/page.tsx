import { format } from 'date-fns';

// Revalidate every 10 seconds
export const dynamic = 'force-static';
export const revalidate = 10;

async function getTimeData() {
  // Generate the timestamp during build or revalidation
  const now = new Date();
  return {
    generatedAt: now.toISOString(),
    formattedDate: format(now, 'MMMM do, yyyy'),
    formattedTime: format(now, 'HH:mm:ss'),
  };
}

export default async function ISRDatePage() {
  // This will cache the result and only revalidate after `revalidate` seconds
  const timeData = await getTimeData();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Incremental Site Regeneration (ISR) : Date Example
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Current Content
            </h2>
            <p className="text-gray-600">This content was generated at:</p>
            <p className="text-xl font-mono mt-2">{timeData.formattedTime}</p>
            <p className="text-gray-600 mt-1">on {timeData.formattedDate}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              This page uses ISR with a 10-second revalidation period.
            </p>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Reload the page now: You&apos;ll see the same timestamp</li>
              <li>
                Wait 10+ seconds and reload: You&apos;ll see a new timestamp
              </li>
              <li>The timestamp shows when the page was last regenerated</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
