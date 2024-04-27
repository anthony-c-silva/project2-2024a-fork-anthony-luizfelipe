import { useState } from 'react';
import {Stack, Form, Button} from 'react-bootstrap';
import "./Question.css";

interface QuestionProps {
  title: string;
  options: string[];
  onSetOption: (op : number) => void;
}

function Question(props : QuestionProps) {
  const options = props.options;
	const title = props.title;
  const onSetOption = props.onSetOption;

  const [activeOption, setActiveOption] = useState(-1);

  const handleOptionChange = (index: number) => {
    onSetOption(index);
    setActiveOption(index);
  }

  return (
    <Form className="d-flex flex-column align-items-center p-5 text-white"
      style={{
        backgroundColor:"#0B132B"
      }}>
        <Form.Label className="text-center col-md-5">
			    <h2 dangerouslySetInnerHTML={{ __html: title }}/>
        </Form.Label>

        <Stack gap={3} className="col-md-3 mx-auto">
          {options.map((item, index) => (
            <Button 
              key={index}
              variant={activeOption === index ? "success" : "outline-primary"}
              onClick={() => handleOptionChange(index)}
              className={
                "question_button d-flex p-3 justify-content-between"
                + (index===activeOption ? " question_active" : "")
              }
            >
              <span 
                className={
                  "d-flex align-items-center question_badge" 
                  + (index===activeOption ? " question_active" : "")
                }
                >{index}</span>
              <label className="px-3" dangerouslySetInnerHTML={{ __html: item }}></label>
            </Button>

          ))}
        </Stack>
    </Form>
  );
}

export default Question;
