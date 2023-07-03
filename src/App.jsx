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
						<Route path='/' element={<Login />}></Route>
						<Route
							path='/sustancia-list'
							element={<SustanciaList />}
						></Route>
						<Route
							path='/create-sustancia'
							element={<SustanciaForm />}
						></Route>
						<Route
							path='/edit-sustancia/:id'
							element={<SustanciaForm />}
						></Route>
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
