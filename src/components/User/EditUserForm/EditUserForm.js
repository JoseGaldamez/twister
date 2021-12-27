import React, { useCallback, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import './EditUserForm.scss';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import { useDropzone } from 'react-dropzone';
import { API_HOST } from '../../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { updateUser, uploadAvatarApi, uploadBannerApi } from '../../../api/user';
import { toast } from 'react-toastify';


const EditUserForm = props => {

    const {user, setShowModal } = props;

    const [loading, setloading] = useState(false)

    // Creating a State from user 
    const [formData, setFormData] = useState( initiValues( user ) );

    // States for URL images
    const [bannerURL, setBannerURL] = useState(
        user?.banner ? `${API_HOST}/getBanner?id=${user.id}` : null
    );

    const [avatarURL, setAvatarURL] = useState(
        user?.banner ? `${API_HOST}/getAvatar?id=${user.id}` : null
    );




    // State for images
    const [bannerFile, setBannerFile] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);




    // Creating funcion to manage files of Dropzone

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropBanner = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setBannerFile(file);
        setBannerURL( URL.createObjectURL(file) );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setAvatarFile(file);
        setAvatarURL( URL.createObjectURL(file) );
    });




    // Configures Dropzones
    const { getRootProps:getRootBannerProps, getInputProps:getInputBannerProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner,
    });

    const { getRootProps:getRootAvatarProps, getInputProps:getInputAvatarProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar,
    });






    // functions of Form
    
    const onChangeDate = date =>{
        setFormData( { ...formData, birthDay: date } )
    }
    
    const onChange = e => {
        setFormData( { ...formData, [e.target.name]: e.target.value } )
    }
    
    const onSubmit = async (e) =>{
        e.preventDefault();
        setloading(true);
        
        if (bannerFile) {
            await uploadBannerApi(bannerFile)
            .catch(err => {
                console.log(err)
                toast.error("Error al subir el nuevo banner");
            } );
        }

        if (avatarFile) {
            await uploadAvatarApi(avatarFile)
            .catch(err => {
                console.log(err)
                toast.error("Error al subir el nueva avatar");
            } );
        }

        await updateUser(formData).then( () => {
            setShowModal(false);
            toast.success("Perfil actualizado")
        } ).catch(err => toast.error("Error al actualizar los datos"));
        
        setloading(false);
        window.location.reload();
    }



    return (
        <div className='edit-user-form'>

            <div className='banner' { ...getRootBannerProps() } style={{backgroundImage: `url('${bannerURL}')`}} >
                <input { ...getInputBannerProps() } />

                <FontAwesomeIcon icon={faCamera} />
            </div>


            <div className='avatar' { ...getRootAvatarProps() } style={{backgroundImage: `url('${avatarURL}')`}} >
                <input { ...getInputAvatarProps() } />

                <FontAwesomeIcon icon={faCamera} />
            </div>



            <Form onSubmit={ onSubmit } >

                <Form.Group>
                    <Row>
                        <Col>
                        <Form.Control onChange={onChange} type='text' placeholder='Nombre' name='name' defaultValue={formData.name} ></Form.Control>
                        </Col>
                        <Col>
                        <Form.Control onChange={onChange} type='text' placeholder='Apellido' name='lastName' defaultValue={formData.lastName}></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Control onChange={onChange} type='textarea' as='textarea' row="3" placeholder='Agrega una biografía' name='biografy' defaultValue={formData.biografy} ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Control onChange={onChange} type='text' placeholder='Sitio web' name='webSite' defaultValue={formData.webSite}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <DatePicker onChange={ onChangeDate } className='Fecha de nacimiento' locale={es} selected={ new Date( formData.birthDay ) }  />
                </Form.Group>

                <Form.Group>
                    <Form.Control onChange={onChange} type='text' placeholder='Direccion' name='location' defaultValue={formData.location}></Form.Control>
                </Form.Group>

                <Button className='btn-submit' variant='primary' type='submit'>
                { loading && <Spinner animation='border' size='sm' /> } Actualizar
                </Button>
            </Form>
        </div>
    );
}

export default EditUserForm;


const initiValues = user => {
    return {
        id: user.id || "",
        name: user.name || "",
        lastName: user.lastName || "",
        biografy: user.biografy || "",
        location: user.location || "",
        webSite: user.webSite || "",
        birthDay: user.birthDay,
    }
}