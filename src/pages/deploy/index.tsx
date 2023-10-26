import Content from "@/components/content.component"
import Head from "next/head"
import {
  DeployColumn,
  DeployTopButton,
  DeployFooter,
} from "@/components/deploy.component"
import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { ChooseNinja, NinjaImage } from "@/components/ninja.component"
import {
  DndContext,
  DragOverlay,
  TouchSensor,
  useSensor,
  MouseSensor,
} from "@dnd-kit/core"
import { dropData } from "@/types/deploy.types"
import { stripColName } from '@/utils/ninja.utils';
import { ComboTable } from '@/components/combo.component';
import Title from '@/components/ui-elements/title.ui';

export default function Deploy() {
  const [CHOOSED, setChoosed] = useState('SSS');
  const [dragged, setDragged] = useState('');
  const [dropped, setDropped] = useState<dropData>(new Map());
  const [onbox, setOnBox] = useState(false);
  const mouseSens = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 0,
    },
  });
  const touchSens = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 0,
    },
  });

  return (
    <>
      <Head>
        <title>Deploy Construct</title>
      </Head>
      <Content name="Deploy">
        <Title title="Deploy Tool" bg="/assets/bg/w1.png" desc="Mempunyai pengertian setiap baris data pada tabel pertama dihubungkan hanya ke satu baris ." />
        <Container className="bg-dark-primary p-2">
          <h2 className="fs-1 text-uppercase" style={{ letterSpacing: '1px' }}>
            Deploy tool
          </h2>
          {/* <p className="text-center">In-Game like deploy tools</p>
          <p>Click ninja icon inside deploy column to remove them</p>
          <p>Click choose ninja button to choose ninja class</p>
          <p>Click clear deploy to clear current deploy</p>
          <p>Click total Attributes to copy total attributes</p>
          <p>
            <strong>Press and hold</strong> ninja for phone user
          </p> */}
          <DeployTopButton setChoosed={setChoosed} setDropped={setDropped} dropped={dropped} />
          <DndContext
            autoScroll={false}
            sensors={[touchSens, mouseSens]}
            onDragStart={(ev) => {
              setDragged(stripColName(ev.active.id.toString()));
            }}
            onDragEnd={(ev) => {
              setDragged('');
              if (ev.over && ev.active) {
                dropped.set(ev.over.id.toString(), stripColName(ev.active.id.toString()));
                // setDropped(dropped)
                setOnBox(true);
              } else {
                setOnBox(false);
              }
            }}
          >
            {CHOOSED && <ChooseNinja kelas={CHOOSED} />}

            <DragOverlay
              dropAnimation={{ duration: !onbox ? 500 : 0 }}
              // style={{ touchAction: "none" }}
            >
              {dragged ? <NinjaImage name={dragged.replaceAll('-', ' ')} /> : null}
            </DragOverlay>

            <Row>
              <Col xl={5}>
                <DeployColumn dropped={dropped} dropstate={setDropped} />
              </Col>
              <Col xl={7}>
                <ComboTable ninjas={[...dropped.entries()].map(([_, ninja]) => ninja.replaceAll('-', ' '))} />
              </Col>
            </Row>
          </DndContext>
          <DeployFooter dropped={dropped} />
        </Container>
      </Content>
    </>
  );
}
