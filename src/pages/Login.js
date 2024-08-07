// src/Login.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row } from "antd";


const Login = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      navigate("/");
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      navigate("/");
    });
    return () => subscription.unsubscribe();
  }, []);
  if (!session) {
    return (
      <>
      <Row
        style={{
          height: 100,
          justifyContent: "center"
        }}
      ></Row>
      <Row
        style={{
          height: 500,
          justifyContent: "center"
        }}
      >
        <Col
          style={{
            display: "flex",
            
            alignItems: "center",
            justifyContent: "center",
            flex: 1
          }}
        >
          <Card
            title="Welcome"
            bordered={false}
            style={{ width: 300, align: 'center' }}>
            <div >
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={["google", "github"]}
              />
            </div>
          </Card>
        </Col>
      </Row>
      </>
    );
  } else {
    return (
      <div>
        <div>Logged in!</div>
      </div>
    );
  }
};

export default Login;
