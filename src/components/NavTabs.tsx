import { Tabs, TabsRef } from "flowbite-react";
import { useRef } from "react";
import { NavTab } from "src/models/components";

interface NavTabsProps {
  activeTab: number,
  items: NavTab[]
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
          <Tabs.Item active={i === activeTab} title={item.title.toUpperCase().replace('-', ' ')}>
            {item.body}
          </Tabs.Item>
        )}
      </Tabs.Group>
    </>
  );
};

export default NavTabs;