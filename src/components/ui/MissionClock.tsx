'use client';

import { useEffect, useState } from 'react';

type MissionClockProps = {
  timeZone: string;
  className?: string;
};

/** Live clock in a named IANA zone. Renders a dash until mounted. */
export function MissionClock({ timeZone, className }: MissionClockProps) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date());

    setNow(format());
    const id = window.setInterval(() => setNow(format()), 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <time dateTime={now ?? undefined} className={className}>
      {now ?? '——:——:——'}
    </time>
  );
}
