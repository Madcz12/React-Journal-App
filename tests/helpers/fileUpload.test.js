import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dvoltvqfc',
    api_key: '564834728126549',
    api_secret: 'e9HJtZXOjKkY3i6x4nFsBPVw1I4',
    secure: true
});

describe('Pruebas en fileUpload.js', () => { 

    test('Debe de subir el archivo correctamente a cloudinary', async() => {

        const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDgzJXq5kRGqM4pZAIXF2cqvXaqDH0NSfcmg&s';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'test_landscape.png');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        //console.log(url);
        // crea un arreglo cortando los slashes ('/')
        const segments = url.split('/');
        // llega al final del arreglo segments y le agrega el jpg correspondiente
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        console.log({imageId});
        // mandamos el arreglo a la función delete_resource de la api de cloudinary
        const cloudResp = await cloudinary.api.delete_resources([imageId], {
            resource_type: 'image',
        });
        console.log({cloudResp});
     });

    test('Debe de retornar null', async() => {

        const file = new File([], 'test_landscape.png');

        const url = await fileUpload(file);
        expect(url).toBe(null);

    });
 });