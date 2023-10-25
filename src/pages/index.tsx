import Content from '@/components/content.component'
import Head from 'next/head';
import Header from '@/components/ui-elements/header.ui';
import CardList from '@/components/ui-elements/card/cardList.ui';
import Donate from '@/components/ui-elements/donate.ui';

export default function Home() {
  return (
    <>
      <Head>
        <title>NHTools</title>
      </Head>
      <Content>
        <Header />
        <CardList />
        <Donate />
      </Content>
    </>
  );
}
