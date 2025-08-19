import SettingsClient from './SettingsClient';
import PageLayout from '@/components/layout/PageLayout';
import { SETTINGS_DEFAULTS } from '@/lib/settings/defaults';

export default function SettingsPage() {
  // If you later fetch user-specific settings on the server,
  // pass them here instead of SETTINGS_DEFAULTS.
  return (
    <PageLayout title="Settings" description="Customize your experience">
      <SettingsClient initial={SETTINGS_DEFAULTS} />
    </PageLayout>
  );
}
