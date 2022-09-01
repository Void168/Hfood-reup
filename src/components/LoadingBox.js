import React from 'react'
import {Container, Row} from 'react-bootstrap'

export default function LoadingBox() {
    return (
        <Container>
            <Row className="loading">
                <span></span>
                <span></span>
                <span></span>
                <div>Đang tải...</div>
            </Row>
            
        </Container>
    )
}