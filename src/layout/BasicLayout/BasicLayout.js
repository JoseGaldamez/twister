import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LeftMenu from '../../components/LeftMenu/LeftMenu';
import './BasicLayout.scss';

const BasicLayout = props => {
    const {children, className, setreFreshCheckLogin, changeRefreshing} = props;

    

    return (
        <Container className={`basic-layout ${className}`} >
            <Row>
                <Col xs={3} className='basic-layout__menu'>
                    <LeftMenu changeRefreshing={changeRefreshing} setreFreshCheckLogin={setreFreshCheckLogin} />
                </Col>
                <Col xs={9} className='basic-layout__content'>
                    { children }
                </Col>
            </Row>
        </Container>
    );
}

export default BasicLayout;
