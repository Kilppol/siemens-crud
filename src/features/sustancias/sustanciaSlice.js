import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	addDoc,
	collection,
	getDocs,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
} from 'firebase/firestore';
import db from '../../Firebase/Config';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

// Subir imagen a Firestore
export const uploadImageToFirestore = createAsyncThunk(
	'sustancia/uploadImageToFirestore',
	async (image) => {
		const storage = getStorage();
		const imageRef = ref(storage, `images/${image.name}`);
		await uploadBytes(imageRef, image);
		const downloadURL = await getDownloadURL(imageRef);

		return downloadURL;
	}
);
//add a sustancia to firestore
export const addSustanciaToFirestore = createAsyncThunk(
	'sustancia/addSustanciaToFirestore',
	async (sustancia) => {
		// Verificar campos vacíos
		if (
			sustancia.nombre.trim() === '' ||
			sustancia.principalesUsos.trim() === '' ||
			sustancia.palabraAdvertencia.trim() === '' ||
			sustancia.telefonoEmergencia.trim() === '' ||
			sustancia.area.trim() === '' ||
			sustancia.cantidadEstimada.trim() === '' ||
			sustancia.tipodeContenedor.trim() === '' ||
			sustancia.consumoPromedio.trim() === ''
		) {
			throw new Error('Todos los campos son obligatorios');
		}
		const querySnapshot = await getDocs(collection(db, 'Sustancias'));
		const existingSustancia = querySnapshot.docs.find(
			(doc) => doc.data().nombre === sustancia.nombre
		);

		if (existingSustancia) {
			throw new Error('La sustancia ya existe');
		}

		const addSustanciaRef = await addDoc(
			collection(db, 'Sustancias'),
			sustancia
		);
		const newSustancia = { id: addSustanciaRef.id, sustancia };

		return newSustancia;
	}
);

//Fetch Sustancias

export const fetchSustancias = createAsyncThunk(
	'sustancias/fetchSustancias',
	async () => {
		const querySnapshot = await getDocs(collection(db, 'Sustancias'));
		const sustancias = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			sustancia: doc.data(),
		}));
		return sustancias;
	}
);

// delete sustancias
export const deleteSustancia = createAsyncThunk(
	'sustacias/deleteSustancias',
	async (id) => {
		const sustancias = await getDocs(collection(db, 'Sustancias'));
		for (var snap of sustancias.docs) {
			if (snap.id === id) {
				await deleteDoc(doc(db, 'Sustancias', snap.id));
			}
		}
		return id;
	}
);
// update sustancia

export const updateSustanciaInFirestore = createAsyncThunk(
	'sustancia/updateSustanciaInFirestore',
	async ({
		id,
		nombre,
		principalesUsos,
		palabraAdvertencia,
		telefonoEmergencia,
		area,
		cantidadEstimada,
		tipodeContenedor,
		consumoPromedio,
		imagen,
	}) => {
		if (
			nombre.trim() === '' ||
			principalesUsos.trim() === '' ||
			palabraAdvertencia.trim() === '' ||
			telefonoEmergencia.trim() === '' ||
			area.trim() === '' ||
			cantidadEstimada.trim() === '' ||
			tipodeContenedor.trim() === '' ||
			consumoPromedio.trim() === ''
		) {
			throw new Error('Todos los campos son obligatorios');
		}
		try {
			const docRef = doc(db, 'Sustancias', id);
			await updateDoc(docRef, {
				nombre: nombre,
				principalesUsos: principalesUsos,
				palabraAdvertencia: palabraAdvertencia,
				telefonoEmergencia: telefonoEmergencia,
				area: area,
				cantidadEstimada: cantidadEstimada,
				tipodeContenedor: tipodeContenedor,
				consumoPromedio: consumoPromedio,
				imagen: imagen,
			});

			return {
				id: id,
				nombre: nombre,
				principalesUsos: principalesUsos,
				palabraAdvertencia: palabraAdvertencia,
				telefonoEmergencia: telefonoEmergencia,
				area: area,
				cantidadEstimada: cantidadEstimada,
				tipodeContenedor: tipodeContenedor,
				consumoPromedio: consumoPromedio,
				imagen: imagen,
			}; // Devuelve la sustancia actualizada
		} catch (error) {
			throw new Error('Error al actualizar la sustancia: ' + error.message);
		}
	}
);

///sustancia por id
export const fetchSustanciaById = createAsyncThunk(
	'sustancia/fetchSustanciaById',
	async (id) => {
		try {
			const docRef = doc(db, 'Sustancias', id); // 'db' es tu instancia de Firebase Firestore
			const docSnapshot = await getDoc(docRef);

			if (docSnapshot.exists()) {
				return { id: docSnapshot.id, sustancia: docSnapshot.data() };
			} else {
				throw new Error('La sustancia no existe');
			}
		} catch (error) {
			throw new Error('Error al obtener la sustancia: ' + error.message);
		}
	}
);

export const sustanciaSlice = createSlice({
	name: 'sustancias',
	initialState: {
		sustanciasArray: [],
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addSustanciaToFirestore.fulfilled, (state, action) => {
				state.sustanciasArray.push(action.payload);
				state.error = null; // Restablece el error a null después de agregar la sustancia
			})
			.addCase(addSustanciaToFirestore.rejected, (state, action) => {
				state.error = action.error.message; // Almacena el mensaje de error en el estado
			})
			.addCase(fetchSustancias.fulfilled, (state, action) => {
				state.sustanciasArray = action.payload;
			})
			.addCase(deleteSustancia.fulfilled, (state, action) => {
				state.sustanciasArray = state.sustanciasArray.filter(
					(sustancia) => sustancia.id !== action.payload
				);
			})
			.addCase(updateSustanciaInFirestore.fulfilled, (state, action) => {
				const updatedSustancia = action.payload;
				const index = state.sustanciasArray.findIndex(
					(sustancia) => sustancia.id === updatedSustancia.id
				);
				if (index !== -1) {
					state.sustanciasArray[index].sustancia = updatedSustancia; // Actualiza la sustancia en el estado de Redux
				}
				// state.sustanciaInicial = updatedSustancia; // Actualiza la sustancia inicial en el estado de Redux
			})
			.addCase(fetchSustanciaById.fulfilled, (state, action) => {
				state.sustanciaInicial = action.payload;
			})
			.addCase(uploadImageToFirestore.fulfilled, (state, action) => {
				state.imagenURL = action.payload;
			});
	},
});

// export const { addSustancia, editSustancia } = sustanciaSlice.actions;
export default sustanciaSlice.reducer;
