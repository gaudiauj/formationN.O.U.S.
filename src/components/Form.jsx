/* eslint-disable react/prop-types */
import { Button, TextField } from '@mui/material';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      {...field}
      {...props}
      id={props.name}
      label={label}
      error={meta.touched && meta.error}
      helperText={meta.touched && meta.error}
    />
  );
};

export const CongratsForm = ({ score }) => {
  const [isDone, setIsDone] = useState(false);
  console.log('isDone on init ' + isDone);
  const FormikProps = {
    initialValues: {
      pseudo: '',
      email: '',
      score: score,
    },
    onSubmit: (values) => {
      console.log(values);
      console.log('submit');

      //   ('http://localhost:3001/scores');
      //   {
      //     mode: 'cors',
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(values),
      setIsDone(true);

      console.log('isDone on submit ' + isDone);

      fetch('http://localhost:3000/score', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(() => {
          // Do it on success
          console.log('then');
        })
        .catch(() => {
          // Do it on error
          console.log('catch');
        })
        .finally(() => {
          // Always do that
          setIsDone(false);
          console.log('finally');
        });
    },
    validationSchema: Yup.object({
      pseudo: Yup.string()
        .max(15, 'doit faire 15 caractères')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      score: Yup.number().required('Required'),
    }),
  };
  return (
    <Formik {...FormikProps}>
      <Form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '50%',
        }}
      >
        <MyTextField name={'pseudo'} label="pseudo" type="text" />
        <MyTextField name={'email'} label="email" type="email" />
        <MyTextField
          name={'score'}
          label="score"
          type="number"
          inputProps={{
            readOnly: true,
          }}
        />
        <Button type="submit" disabled={isDone}>
          Submit
        </Button>
      </Form>
    </Formik>
  );
};
