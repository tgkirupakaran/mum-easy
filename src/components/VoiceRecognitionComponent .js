// src/VoiceRecognitionComponent.jsx
import React, { useState } from 'react';
import { Button } from "antd";
import { FaMicrophoneAlt } from "react-icons/fa";
import axios from 'axios';


const VoiceRecognitionComponent = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiResponse, setAiResponse] = useState({});

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      setIsListening(false);
      processAndSendData(speechToText);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
 
    recognition.start();
  };

  const processAndSendData = async (speechText) => {
    // Call Azure OpenAI to process the speech text
    const apiKey = 'b8a265f592074bf0950f8dbe7d1ac728';
    const endpoint = 'https://openai-demo-kannadi-maaligai.openai.azure.com/openai/deployments/azopenaigpt4o/chat/completions?api-version=2024-02-15-preview';
    const headers = {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    };

    const openAiRequestData = {
      messages:[{role: 'system', content: "You are a data parser. Identify the data category and extract the information according to the category. the categories are Feeding, Sleep, Diaper, Health and Expression. In Feeding category extract the following fields in JSON format  feeding_type: (Breast, Formula or Expressed), datetime, left_minutes, right_minutes and quantity. In Sleep category extract the following fields in JSON format datetime, sleeptime and person (Baby or Mother). In Expression category extract the following fields in JSON format datetime, expressTime and quantity. In Health category extract the following fields in JSON format datetime, height, weight and temperature. Ind Diaper category extract the following fields in JSON format type (pee, poop or both), pee_level (0 to 10), poop_level (light, medium, heavy), poop_color, poop_type (solid, runny, semi-solid). For all the datetime fields the format should be YYYY-MM-DD HH:mm:ss+00:00. if the date or time is not provided by the user then make it current date and time. example responses {category: 'Feeding', data: '{{ feeding_type: 'Breast', datetime: '2023-10-03 15:40:00+00:00', left_minutes: 20, right_minutes: 20}}} {feeding_type: 'Formula', datetime: '2023-10-03 15:40:00+00:00', quantity:90} {feeding_type: 'Expressed', datetime: '2023-10-03 15:40:00+00:00', expressTime: 120, quantity:90} {person: 'Baby', datetime: '2023-10-03 15:40:00+00:00', sleepTime: 120} {person: 'Mother', datetime: '2023-10-03 15:40:00+00:00', sleepTime: 120 } {datetime: '2023-10-03 15:40:00+00:00', height: 50, weight: 3, temperature: 36}'"}, {role: 'user', content: speechText}],
      max_tokens: 50,
      temperature: 0.5,
    };

    try {
      const response = await axios.post(endpoint, openAiRequestData, { headers });
      console.log(response.data.choices[0].message.content.replace('```json', '').replace('```', '')) 
      const parsedResponse = JSON.parse(response.data.choices[0].message.content.replace('```json', '').replace('```', ''));
      console.log(parsedResponse)
      setAiResponse(parsedResponse)
      // Replace with your API endpoint
      // const apiUrl = 'https://your-api-endpoint.com/endpoint';

      // axios.post(apiUrl, parsedResponse)
      //   .then((apiResponse) => {
      //     console.log('API Response:', apiResponse.data);
      //   })
      //   .catch((apiError) => {
      //     console.error('Error making API request:', apiError);
      //   }); 
    } catch (error) {
      console.error('Error calling Azure OpenAI API:', error);
    }
  };

  return (
    <div>
      <Button onClick={startListening} disabled={isListening} type='primary' icon={<FaMicrophoneAlt /> } loading={isListening}>
        {isListening ? 'Listening...' : 'Start Listening'}
      </Button>
      <p>Transcript: {transcript} 
      AI Response: {JSON.stringify(aiResponse)}
      </p>
    </div>
  );
};

export default VoiceRecognitionComponent;
