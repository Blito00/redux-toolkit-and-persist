import React , {useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { logout } from '../redux/slice/userSlice';
import { ScaledSheet } from 'react-native-size-matters';
import { selectUser } from '../redux/store';
import { router } from 'expo-router';

const UserScreen = ({ }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        // Aquí usaremos el estado de autenticación para redireccionar
        if (!user.loggedIn) {
            //Agregar acciones si no esta logueado
        }
    }, [user.loggedIn]);

    return (
        <View style={styles.container}>
            {user.loggedIn ? (
                <View>
                    <Text style={styles.text}>Nombre: {user.nombre}</Text>
                    <Text style={styles.text}>Email: {user.email}</Text>
                    <Button mode="contained" onPress={handleLogout}>
                        Cerrar Sesion
                    </Button>
                </View>
            ) : (
                <>
                    <Text style={styles.text}>No estás logueado</Text>
                    <Button mode="contained" onPress={() => router.push('')}>
                        Iniciar Sesion
                    </Button>
                </>
                
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20@s',
    },
    text: {
        fontSize: '18@s',
        marginBottom: '10@vs',
    },
    button: {
        marginTop: '20@vs',
        
    },
});

export default UserScreen;
