/* eslint-disable react/prop-types */
import { Formik, Form } from 'formik';
import { MyTextInput } from './InputText';
import * as Yup from 'yup';
import { useGame } from '../gameContext';
import { useState } from 'react';

export const WonForm = () => {
  const game = useGame();
  const [isLoading, setIsLoading] = useState(false);
  const formProps = {
    initialValues: {
      pseudo: '',
      email: '',
      score: game.time,
    },
    validationSchema: Yup.object({
      pseudo: Yup.string()
        .max(15, 'Pas plus de 15 lettres')
        .required('Obligatoire'),
      score: Yup.number().required('Obligatoire'),
      email: Yup.string()
        .email('Adresse email invalide')
        .required('Obligatoire'),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      fetch('http://localhost:3000/score', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values, null, 2),
      }).finally(() => {
        setIsLoading(false);
      });
    },
  };

  return (
    <Formik {...formProps}>
      <>
        Bravo votre score est de : {game.time}
        <br />
        souhaitez vous enregistrer votre score ?
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <MyTextInput
            label="Pseudo"
            name="pseudo"
            type="text"
            placeholder="Pseudo"
          />
          <MyTextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <MyTextInput
            label="Score"
            name="score"
            type="hidden"
            placeholder="Score"
            style={{ display: 'none' }}
          />
          <button type="submit" disabled={isLoading}>
            enregistrer
          </button>
        </Form>
      </>
    </Formik>
  );
};
