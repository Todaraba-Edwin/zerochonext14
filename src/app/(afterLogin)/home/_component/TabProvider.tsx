"use client"

import React from "react";

export enum TabEnum {
  REC = 'rec',
  FOL = 'fol'
}

export const TabContext = React.createContext({
  tab: 'rec',
  setTab: (value: TabEnum) => {},
});

type Props = { children: React.ReactNode };
export default function TabProvider({ children }: Props) {
  const [tab, setTab] = React.useState<TabEnum>(TabEnum.REC);
  const memoizedSetTab = React.useCallback((value: TabEnum) => setTab(value), []);
  const TabContextValueMemo = React.useMemo(() => ({ tab, setTab:memoizedSetTab }), [tab, memoizedSetTab]);
  React.useEffect(()=> console.log('TabContextValueMemo', JSON.stringify(TabContextValueMemo)), [TabContextValueMemo])

  return (
    <TabContext.Provider value={TabContextValueMemo}>
      {children}
    </TabContext.Provider>
  )
}