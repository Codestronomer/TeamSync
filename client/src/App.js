import './App.css';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

function App() {
  // const [message, setMessage] = useState("")

  // const getData = async () => {
  //   const res = await axios.get('/profile')
  //   console.log(res)
  //   setMessage(res.data.message)
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      {/* <p>The Profile message is {message} </p> */}
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
// import axios from 'axios';
// import { useEffect, useState, useReducer } from 'react';

// const formReducer = (state, event) => {
//   if (event.reset) {
//     return {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       confirmPassword: ''
//     }
//   }
//   return {
//     ...state,
//     [event.name]: event.value
//   }
// }

// function SignUp() {
//   const [submitting, setSubmitting] = useState(false);
//   const [formData, setFormData] = useReducer(formReducer, {});

//   const handleSubmit = event => {
//     event.preventDefault();
//     setSubmitting(true);

//     axios.post('/auth/register', {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       password: formData.password,
//       confirmPassword: formData.confirmPassword
//     })
//       .then((response) => {
//         console.log(response);
//         setSubmitting(false);
//         setFormData({ reset: true })
//       })
//       .catch((error) => {
//         console.log(error);
//         setSubmitting(false);
//       })
//   }

//   const handleChange = event => {
//     setFormData({
//       name: event.target.name,
//       value: event.target.value
//     })
//   }
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <fieldset disabled={submitting}>
//           <label>
//             <p>First Name</p>
//             <input name="firstName" onChange={handleChange} value={formData.firstName || ''} />
//           </label>
//         </fieldset>
//         <fieldset disabled={submitting}>
//           <label>
//             <p>Last Name</p>
//             <input name="lastName" onChange={handleChange} value={formData.lastName || ''} />
//           </label>
//         </fieldset>
//         <fieldset disabled={submitting}>
//           <label>
//             <p>Email</p>
//             <input name="email" type="email" onChange={handleChange} value={formData.email || ''} />
//           </label>
//         </fieldset>
//         <fieldset disabled={submitting}>
//           <label>
//             <p>Password</p>
//             <input name="password" type="password" onChange={handleChange} value={formData.password || ''} />
//           </label>
//         </fieldset>
//         <fieldset disabled={submitting}>
//           <label>
//             <p>Confirm Password</p>
//             <input name="confirmPassword" type="password" onChange={handleChange} value={formData.confirmPassword || ''} />
//           </label>
//         </fieldset>
//         <button type="submit" disabled={submitting}>Submit</button>
//       </form>
//     </div>
//   )
// }
