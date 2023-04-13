import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';
import TouchID from 'react-native-touch-id';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isSupported: null,
      isAuthenticated: null
    }
  }

  componentDidMount() {
    TouchID.isSupported()
    .then(sucess => {
      this.setState({isSupported: true})
      console.log('Biometria disponível', sucess)
    })
    .catch(err => {
      this.setState({isSupported: false})
      console.log('Biometria não disponível', err)
    });
  }

  handleLogin = () => {
    const configsAuth = {
      title: 'Autenticação',
      color: '#FF000', 
      sensorErrorDescription: 'Falha na autenticação',
      sensorDescription: 'Coloque o dedo no sensor',
      cancelText: 'Cancelar',
      fallbackLabel: 'Fazer login novamente',
    }
    if(!this.state.isSupported) return;
    TouchID.authenticate('Acessar o app', configsAuth)
    .then(success => {
      this.setState({isAuthenticated: true})
      console.log('Autenticação realizada com sucesso', success)
    })
    .catch(err => {
      console.log('Falha na autenticação', err)
    })
  }

render() {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text>Biometria disponível: {this.state.isSupported ? 'SIM' : 'NÃO'}</Text>
      <TouchableHighlight style={styles.buttonLogin} onPress={this.handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableHighlight>
      {this.state.isAuthenticated && <Text>Autenticado</Text>}
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  buttonLogin:{
    borderRadius: 6,
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#0391D7'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
