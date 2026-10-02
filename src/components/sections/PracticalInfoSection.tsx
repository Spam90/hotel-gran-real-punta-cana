import { Icon } from '@/components/icons';
import { contact, practicalInfo } from '@/data/hotel';

const iconById: Record<string, 'clock' | 'phone' | 'location' | 'wifi' | 'parking'> =
  {
    checkin: 'clock',
    checkout: 'clock',
    phone: 'phone',
    location: 'location',
    wifi: 'wifi',
    parking: 'parking',
  };

export function PracticalInfoSection() {
  return (
    <section className="bg-ocean-800 py-16 text-cream">
      <div className="container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {practicalInfo.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 border-cream/10 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream/10 text-gold-300">
                <Icon name={iconById[item.id] ?? 'sparkle'} className="text-xl" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cream/60">
                  {item.label}
                </p>
                {item.id === 'phone' ? (
                  <a
                    href={`tel:${contact.phoneTel}`}
                    className="mt-1 inline-block font-medium text-cream transition-colors hover:text-gold-300"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 font-medium text-cream">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
