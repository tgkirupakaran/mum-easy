import { GiBabyBottle, GiNightSleep, GiHealthNormal,GiBodyHeight ,GiWeight   } from "react-icons/gi";
import { LuMilk } from "react-icons/lu";
import { FaRegClock, FaRulerVertical, FaPersonBreastfeeding, FaBaby,FaTemperatureHalf  } from "react-icons/fa6";
import { supabase } from '../supabaseClient';
import React, { useEffect, useState } from 'react';
import { Form, Radio, DatePicker, TimePicker, InputNumber, Button, message, Tabs,Divider } from 'antd';
import dayjs from 'dayjs';

const Log = () => {
  const [feedForm] = Form.useForm();
  const [sleepForm] = Form.useForm();
  const [expressForm] = Form.useForm();
  const [healthForm] = Form.useForm();

  const [feedingType, setFeedingType] = useState('Breast');
  const [userId, setUsedId] = useState(null);
  // const [sleepPerson, setSleepPerson] = useState('Baby');
  
  const handleFeedSubmit = async (values) => {
    const { feeding_type, date, time, left_minutes, right_minutes, quantity } = values;
    const datetime = dayjs(date).hour(dayjs(time).hour()).minute(dayjs(time).minute()).second(0).format('YYYY-MM-DD HH:mm:ssZ');

    const { error } = await supabase
      .from('feedings')
      .insert([{ feeding_type, datetime, left_minutes, right_minutes, quantity,user_id: userId  }]);

    if (error) {
      message.error('Failed to save feed details');
      console.error(error);
    } else {
      message.success('Feed details saved successfully');
      feedForm.resetFields();
    }
  };

  const handleSleepSubmit = async (values) => {
    const { person, date, time, sleepTime } = values;
    const datetime = dayjs(date).hour(dayjs(time).hour()).minute(dayjs(time).minute()).second(0).format('YYYY-MM-DD HH:mm:ssZ');

    const { error } = await supabase
      .from('sleeps')
      .insert([{ person, datetime, sleep_time: sleepTime,user_id: userId }]);

    if (error) {
      message.error('Failed to save sleep details');
      console.error(error);
    } else {
      message.success('Sleep details saved successfully');
      sleepForm.resetFields();
    }
  };

  const handleExpressSubmit = async (values) => {
    const {  date, time, expressTime, quantity } = values;
    const datetime = dayjs(date).hour(dayjs(time).hour()).minute(dayjs(time).minute()).second(0).format('YYYY-MM-DD HH:mm:ssZ');

    const { error } = await supabase
      .from('expressions')
      .insert([{ datetime, express_time: expressTime ,quantity,user_id: userId }]);

    if (error) {
      message.error('Failed to save expression details');
      console.error(error);
    } else {
      message.success('Expression details saved successfully');
      expressForm.resetFields();
    }
  };
  const handleHealthSubmit = async (values) => {
    const {  date, time, height, weight, temperature } = values;
    const datetime = dayjs(date).hour(dayjs(time).hour()).minute(dayjs(time).minute()).second(0).format('YYYY-MM-DD HH:mm:ssZ');

    const { error } = await supabase
      .from('health')
      .insert([{ datetime, height, weight, temperature ,user_id: userId }]);

    if (error) {
      message.error('Failed to submit data');
      console.error(error);
    } else {
      message.success('Data submitted successfully');
      healthForm.resetFields();
    }
  };

  
  const defaultFeed = {
    feeding_type: 'Breast',
    date: dayjs(),
    time: dayjs(),
    left_minutes: 20,
    right_minutes: 20,
    quantity: 30
  };

  const defaultSleep = {
    person: 'Baby',
    date: dayjs(),
    time: dayjs(),
    sleepTime: 120
  };

  const defaultExpress = {
    date: dayjs(),
    time: dayjs(),
    expressTime: 120,
    quantity: 30
  };

  const defaultHealth = {
    date: dayjs(),
    time: dayjs(),
    height: 50,
    weight: 3,
    temperature: 36
  };



  const tabItems = [
    {
      key: "feeding",
      label: "Feeding",
      children: <><div >
        <Divider plain />
        <Form initialValues= { defaultFeed } form={feedForm} onFinish={handleFeedSubmit} layout="vertical" >
          <Form.Item name="feeding_type" label="Feeding Type" rules={[{ required: true, message: 'Please select feeding type' }]} >
            <Radio.Group defaultValue='Breast' value={feedingType} onChange={(e) => setFeedingType(e.target.value)} >
              <Radio.Button value="Breast" style={{ width: 90, height: 70 }} >Breast <FaPersonBreastfeeding style={{ width: 30, height: 30 }} /> </Radio.Button>
              <Radio.Button value="Formula" style={{ width: 90, height: 70 }}>Formula <GiBabyBottle style={{ width: 30, height: 30 }} /> </Radio.Button>
              <Radio.Button value="Expressed" style={{ width: 90, height: 70 }}>Expressed <LuMilk style={{ width: 30, height: 30 }} /> </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select date' }]} defaultValue={dayjs()}>
            <DatePicker />
          </Form.Item>

          <Form.Item name="time" label="Time" rules={[{ required: true, message: 'Please select time' }]} defaultValue={dayjs()}>
            <TimePicker />
          </Form.Item>

          {feedingType === 'Breast' && (
            <>
              <Form.Item name="left_minutes" label="Left Minutes" rules={[{ required: true, message: 'Please enter left minutes' }]}>
                <InputNumber min={0} prefix={<FaRegClock />} />
              </Form.Item>
              <Form.Item name="right_minutes" label="Right Minutes" rules={[{ required: true, message: 'Please enter right minutes' }]}>
                <InputNumber min={0} prefix={<FaRegClock />} />
              </Form.Item>
            </>
          )}

          {(feedingType === 'Formula' || feedingType === 'Expressed') && (
            <Form.Item name="quantity" label="Quantity (ml)" rules={[{ required: true, message: 'Please enter quantity' }]}>
              <InputNumber min={0} prefix={<FaRulerVertical />} />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button htmlType="reset" style={{ marginLeft: '10px' }}>Reset</Button>
          </Form.Item>
        </Form>
      </div>
      </>,
      icon: <GiBabyBottle />
    },
    {
      key: "sleep",
      label: "Sleep",
      children: <>
      <Divider plain />
        <Form initialValues={defaultSleep} form={sleepForm} onFinish={handleSleepSubmit} layout="vertical" >
          <Form.Item name="person" label="Person" rules={[{ required: true, message: 'Please select Person' }]} >
            <Radio.Group >
              <Radio.Button value="Baby" style={{ width: 90, height: 70 }} >Baby <FaBaby style={{ width: 30, height: 30 }} /> </Radio.Button>
              <Radio.Button value="Mother" style={{ width: 90, height: 70 }}>Mother <FaPersonBreastfeeding style={{ width: 30, height: 30 }} /> </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select date' }]} defaultValue={dayjs()}>
            <DatePicker />
          </Form.Item>

          <Form.Item name="time" label="Time" rules={[{ required: true, message: 'Please select time' }]} defaultValue={dayjs()}>
            <TimePicker  />
          </Form.Item>

          <Form.Item name="sleepTime" label="Minutes" rules={[{ required: true, message: 'Please enter sleep time' }]}>
            {/* <><InputNumber value={minutes} min={0} defaultValue={120} prefix={<FaRegClock />} onChange={(e) => setMinutes(parseInt(e))} /> <div> <Tag bordered={false} color="gold">{minutes / 60} hours.</Tag></div></> */}
            <InputNumber min={0} prefix={<FaRegClock />}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button htmlType="reset" style={{ marginLeft: '10px' }}>Reset</Button>
          </Form.Item>
        </Form></>,
      icon: <GiNightSleep />
    },
    {
      key: "express",
      label: "Expression",
      children: <>
      <Divider plain />
      <Form initialValues={defaultExpress} form={expressForm} onFinish={handleExpressSubmit} layout="vertical" >
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select date' }]} defaultValue={dayjs()}>
            <DatePicker />
          </Form.Item>

          <Form.Item name="time" label="Time" rules={[{ required: true, message: 'Please select time' }]} defaultValue={dayjs()}>
            <TimePicker  />
          </Form.Item>

          <Form.Item name="expressTime" label="Minutes" rules={[{ required: true, message: 'Please enter sleep time' }]}>
            {/* <><InputNumber value={minutes} min={0} defaultValue={120} prefix={<FaRegClock />} onChange={(e) => setMinutes(parseInt(e))} /> <div> <Tag bordered={false} color="gold">{minutes / 60} hours.</Tag></div></> */}
            <InputNumber min={0}  prefix={<FaRegClock />}/>
          </Form.Item>

          <Form.Item name="quantity" label="Quantity (ml)" rules={[{ required: true, message: 'Please enter quantity' }]}>
              <InputNumber min={0}  prefix={<FaRulerVertical />} />
            </Form.Item>
          <Form.Item>

            <Button type="primary" htmlType="submit">Submit</Button>
            <Button htmlType="reset" style={{ marginLeft: '10px' }}>Reset</Button>
          </Form.Item>
        </Form></>,
      icon: <LuMilk />
    },
    {
      key: "health",
      label: "Health",
      children: <>
      <Divider plain />
      <Form initialValues={defaultHealth} form={healthForm} onFinish={handleHealthSubmit} layout="vertical" >
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select date' }]} defaultValue={dayjs()}>
            <DatePicker />
          </Form.Item>

          <Form.Item name="time" label="Time" rules={[{ required: true, message: 'Please select time' }]} defaultValue={dayjs()}>
            <TimePicker  />
          </Form.Item>

          <Form.Item name="height" label="Height (cm)" >
            {/* <><InputNumber value={minutes} min={0} defaultValue={120} prefix={<FaRegClock />} onChange={(e) => setMinutes(parseInt(e))} /> <div> <Tag bordered={false} color="gold">{minutes / 60} hours.</Tag></div></> */}
            <InputNumber min={0}  prefix={<GiBodyHeight  />}/>
          </Form.Item>

          <Form.Item name="weight" label="Weight (kg)" >
              <InputNumber min={0}  prefix={<GiWeight  />} />
            </Form.Item>
            <Form.Item name="temperature" label="Temperature (C)" >
              <InputNumber min={0}  prefix={<FaTemperatureHalf  />} />
            </Form.Item>
          <Form.Item>

            <Button type="primary" htmlType="submit">Submit</Button>
            <Button htmlType="reset" style={{ marginLeft: '10px' }}>Reset</Button>
          </Form.Item>
        </Form></>,
      icon: <GiHealthNormal />
    },
  ]

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      console.log(user)
      setUsedId(user.id);
    });
  }, []);
  return (
    <div >
     <Tabs defaultActiveKey="feeding" items={tabItems} />
    </div>
  );
};

export default Log;
