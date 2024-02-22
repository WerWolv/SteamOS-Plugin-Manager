import { SidebarNavigation } from 'decky-frontend-lib';
import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCode, FaFileCode, FaFlask, FaPlug } from 'react-icons/fa';

import { useSetting } from '../../utils/hooks/useSetting';
import DeckyIcon from '../DeckyIcon';
import WithSuspense from '../WithSuspense';
import GeneralSettings from './pages/general';
import PluginList from './pages/plugin_list';
import LogViewerPage from '../logviewer';

const DeveloperSettings = lazy(() => import('./pages/developer'));
const TestingMenu = lazy(() => import('./pages/testing'));

export default function SettingsPage() {
  const [isDeveloper, setIsDeveloper] = useSetting<boolean>('developer.enabled', false);
  const { t } = useTranslation();

  const pages = [
    {
      title: t('SettingsIndex.general_title'),
      content: <GeneralSettings isDeveloper={isDeveloper} setIsDeveloper={setIsDeveloper} />,
      route: '/decky/settings/general',
      icon: <DeckyIcon />,
    },
    {
      title: t('SettingsIndex.plugins_title'),
      content: <PluginList isDeveloper={isDeveloper} />,
      route: '/decky/settings/plugins',
      icon: <FaPlug />,
    },
    {
      title: t('SettingsIndex.log_viewer', "Log Viewer"),
      content: (
        <WithSuspense>
          <LogViewerPage/>
        </WithSuspense>
      ),
      route: '/decky/settings/logs',
      icon: <FaFileCode />
    },
    {
      title: t('SettingsIndex.developer_title'),
      content: (
        <WithSuspense>
          <DeveloperSettings />
        </WithSuspense>
      ),
      route: '/decky/settings/developer',
      icon: <FaCode />,
      visible: isDeveloper,
    },
    {
      title: t('SettingsIndex.testing_title'),
      content: (
        <WithSuspense>
          <TestingMenu />
        </WithSuspense>
      ),
      route: '/decky/settings/testing',
      icon: <FaFlask />,
      visible: isDeveloper,
    }
  ];

  return <SidebarNavigation pages={pages} />;
}
