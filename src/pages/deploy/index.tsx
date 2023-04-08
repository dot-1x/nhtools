import Content from "@/components/content.component";
import { ReactEventHandler, useState } from "react";
import { Button, Container, DropdownButton } from "react-bootstrap";
import Head from "next/head";

export default function Deploy() {
    return (
        <>
            <Head>
                <title>Deploy Constructor</title>
            </Head>
            <Content>
                <Container className="bg-dark p-2">
                    <h3>Deploy tool</h3>
                    <p>Tools utilitas untuk mengkombinasi deploy</p>
                </Container>
            </Content>
        </>
    )
}