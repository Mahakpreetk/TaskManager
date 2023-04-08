import { Tabs, TabsRef } from "flowbite-react";
import { useRef } from "react";

interface NavTabsProps {
  activeTab: number,
  items: string[]
  onTabChange: (tab: number) => void
}

const NavTabs: React.FC<NavTabsProps> = ({ activeTab, onTabChange, items }) => {
  const tabsRef = useRef<TabsRef>(null);

  return (
    <>
      <Tabs.Group
        aria-label="Default tabs"
        ref={tabsRef}
        onActiveTabChange={onTabChange}
      >
        {items.map((item, i) =>
          <Tabs.Item active={i === activeTab} title={item.toUpperCase().replace('-', ' ')}></Tabs.Item>
        )}
      </Tabs.Group>
    </>
  );
};

export default NavTabs;