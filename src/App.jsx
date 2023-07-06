import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SustanciaForm from './components/SustanciaForm';
import SustanciaList from './components/SustanciaList';
import Login from './components/Login';

function App() {
	return (
		<div className='bg-zinc-900 h-screen text-white'>
			<div className='flex items-center justify-center h-full'>
				<BrowserRouter>
					<Routes>
						<Route exact path='/siemens-crud' element={<Login />}></Route>
						<Route
							exact
							path='/siemens-crud/sustancia-list'
							element={<SustanciaList />}
						></Route>
						<Route
							exact
							path='/siemens-crud/create-sustancia'
							element={<SustanciaForm />}
						></Route>
						<Route
							exact
							path='/siemens-crud/edit-sustancia/:id'
							element={<SustanciaForm />}
						></Route>
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
