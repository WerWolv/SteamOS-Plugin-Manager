import {
  DialogButton,
  Dropdown,
  Focusable,
  QuickAccessTab,
  Router,
  SingleDropdownOption,
  SuspensefulImage,
  staticClasses,
} from 'decky-frontend-lib';
import { FC, useRef, useState } from 'react';

import { StorePlugin, StorePluginVersion, requestPluginInstall } from './Store';

interface PluginCardProps {
  plugin: StorePlugin;
}

const classNames = (...classes: string[]) => {
  return classes.join(' ');
};

const PluginCard: FC<PluginCardProps> = ({ plugin }) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      style={{
        padding: '30px',
        paddingTop: '10px',
        paddingBottom: '10px',
      }}
    >
      {/* TODO: abstract this messy focus hackiness into a custom component in lib */}
      <Focusable
        // className="Panel Focusable"
        ref={containerRef}
        onActivate={(e: CustomEvent) => {
          buttonRef.current!.focus();
        }}
        onCancel={(e: CustomEvent) => {
          if (containerRef.current!.querySelectorAll('* :focus').length === 0) {
            Router.NavigateBackOrOpenMenu();
            setTimeout(() => Router.OpenQuickAccessMenu(QuickAccessTab.Decky), 1000);
          } else {
            containerRef.current!.focus();
          }
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: '#ACB2C924',
          height: 'unset',
          marginBottom: 'unset',
          // boxShadow: var(--gpShadow-Medium);
          scrollSnapAlign: 'start',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a
            style={{ fontSize: '18pt', padding: '10px' }}
            className={classNames(staticClasses.Text)}
            // onClick={() => Router.NavigateToExternalWeb('https://github.com/' + plugin.artifact)}
          >
            {plugin.name}
          </a>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <SuspensefulImage
            suspenseWidth="256px"
            style={{
              width: 'auto',
              height: '160px',
            }}
            src={`https://cdn.tzatzikiweeb.moe/file/steam-deck-homebrew/artifact_images/${plugin.name.replace(
              '/',
              '_',
            )}.png`}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p className={classNames(staticClasses.PanelSectionRow)}>
              <span>Author: {plugin.author}</span>
            </p>
            <p className={classNames(staticClasses.PanelSectionRow)}>
              <span>Tags:</span>
              {plugin.tags.map((tag: string) => (
                <span
                  style={{
                    padding: '5px',
                    marginRight: '10px',
                    borderRadius: '5px',
                    background: tag == 'root' ? '#842029' : '#ACB2C947',
                  }}
                >
                  {tag == 'root' ? 'Requires root' : tag}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            alignSelf: 'flex-end',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Focusable
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <div
              style={{
                flex: '1',
              }}
            >
              <DialogButton
                ref={buttonRef}
                onClick={() => requestPluginInstall(plugin, plugin.versions[selectedOption])}
              >
                Install
              </DialogButton>
            </div>
            <div
              style={{
                flex: '0.2',
              }}
            >
              <Dropdown
                rgOptions={
                  plugin.versions.map((version: StorePluginVersion, index) => ({
                    data: index,
                    label: version.name,
                  })) as SingleDropdownOption[]
                }
                strDefaultLabel={'Select a version'}
                selectedOption={selectedOption}
                onChange={({ data }) => setSelectedOption(data)}
              />
            </div>
          </Focusable>
        </div>
      </Focusable>
    </div>
  );
};

export default PluginCard;
