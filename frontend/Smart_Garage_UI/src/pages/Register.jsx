import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';


const schema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short').required('Required'),
});


export default function Register() {
    const { register } = useAuth();
    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="card bg-base-100 shadow-xl w-96 p-6">
                <h2 className="text-xl mb-4 font-bold">Register</h2>
                <Formik initialValues={{ name: '', email: '', password: '' }} validationSchema={schema} onSubmit={register}>
                    {({ errors, touched }) => (
                        <Form className="space-y-3">
                            <div>
                                <Field name="name" placeholder="Full Name" className="input input-bordered w-full" />
                                {touched.name && errors.name && <div className="text-error text-sm">{errors.name}</div>}
                            </div>
                            <div>
                                <Field name="email" placeholder="Email" className="input input-bordered w-full" />
                                {touched.email && errors.email && <div className="text-error text-sm">{errors.email}</div>}
                            </div>
                            <div>
                                <Field name="password" type="password" placeholder="Password" className="input input-bordered w-full" />
                                {touched.password && errors.password && <div className="text-error text-sm">{errors.password}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary w-full">Register</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}