import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import logo from "./logo.png";
import "./index.css"

const MiApi = () => {

    const [datos, setDatos] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [orden, setOrden] = useState(true)

    const entradaDatos = (e) => {
        setBusqueda(e.target.value)
    }

    const clickOrden = () => {
        setOrden(!orden)
    }

    const filtroBusqueda = datos.filter(item => item.nombre.toLowerCase().includes(busqueda.toLowerCase())).sort((a, b) => {
        if (a.nombre < b.nombre) return orden ? -1 : 1
        if (a.nombre > b.nombre) return orden ? 1 : -1
        return 0
    })

    const consumoApi = async () => {
        const url = "https://raw.githubusercontent.com/osmarse/examenReact_OsvaldoMartinez/main/src/lista.json"
        try {
            let respuesta = await fetch(url)
            let nuevaData = await respuesta.json()
            setDatos(nuevaData)
        } catch {
            alert("Error de consumo de API")
        }
    }

    useEffect(() => {
        consumoApi()
    }, [])


    return (
        <>
            <div>
                <Navbar bg="secondary" variant="secondary">
                    <Container>
                        <Navbar.Brand href="#home">
                            <img
                                src={logo}

                                className=" logo d-inline-block align-top"
                            />
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <Container>
                    <Row>
                        <Col>
                            <div className="w-100 mt-3 d-flex">
                                <Button className="me-1" variant="secondary" onClick={clickOrden}>Ordenar por Nombres </Button>
                                <input className="w-50" type="text" value={busqueda} onChange={entradaDatos} placeholder="Buscar personaje" />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container className="my-3">
                    <Row xs={1} md={3} className="g-4">
                        {filtroBusqueda.map(item => (
                            <Col>
                                <Card class="m-5 p-2 bg-light border" style={{ width: '20rem' }}>
                                    <Card.Img className="fotos mt-3 border" src={item.foto} variant="top" />
                                    <Card.Body>
                                        <Card.Title>{item.nombre}</Card.Title>
                                        <Card.Text>Doblajista: {item.doblaje}</Card.Text>
                                        <Button variant="secondary">Info</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>

            </div>
        </>

    )
}

export default MiApi