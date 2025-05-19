import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../../services/authServices';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Comprobar que son iguales
    testingPasswords();
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    setError('');
    setLoading(true);
    e.preventDefault();
   
    try {
      const response = await createAccount({ email, password, name });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email); // Guardar el email del usuario
        setLoading(false);
      }
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      setError('Error al crear la cuenta. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  const testingPasswords = () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
    } else {
      setError('');
    }
  }

  const validateForm = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !name) {
      setError('Por favor completa todos los campos');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    testingPasswords();
    if (error) {
      return;
    }
    handleSubmit(e);
  }

  return (
    <div className='w-full h-screen bg-gray-100'>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Crear Cuenta
                    </h1>
                    <h3 className="font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                        Sistema de Inventario
                    </h3>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required="" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />  
                        </div>
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label for="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50
                            border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={validateForm}
                        disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Crear Cuenta'}
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Ya tienes una cuenta? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Iniciar sesión</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
