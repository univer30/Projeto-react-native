import React from 'react'
import { View, Text, FlatList, TextInput, Button, TouchableHighlight, Alert, CheckBox} from 'react-native'
import { useEffect, useState } from 'react'
import {query, collection, getDocs, addDoc, doc, setDoc, deleteDoc} from 'firebase/firestore'
import { firestore } from '../firebase'
import { styles } from './styles'





const MainScreen = () => {

    const [tarefas, setTarefas] = useState([])
    const [tarefaEmEdicao, settarefaEmEdicao] = useState({id: 0, rotulo: ''})
    const [isSelected, setSelected] = useState(false);
    const [title, setTitle] = useState('salvar')

    async function loadTarefas(){
        try{
          const q = query(collection(firestore, "tarefas"))
          const queryResult = await getDocs(q)
          let items = []
            queryResult.forEach((doc) => {
                items.push({
                    id: doc.id,
                    rotulo: doc.data().rotulo,
                    validar: doc.data().validar
                })
                
            })
            setTarefas(items)
            
        }catch (error) {
            console.log(error)  
        }
    }

    function limparTarefaEmEdicao() {
         settarefaEmEdicao({id: 0, rotulo: ''})
         setTitle('Salvar')
    }

    async function saveTarefa() {
        try{
            if(tarefaEmEdicao.id === 0){
                await  addDoc(collection(firestore, "tarefas"), {rotulo: tarefaEmEdicao.rotulo, validar: isSelected})
                await loadTarefas()
                limparTarefaEmEdicao()
              
            }else {

                if(isSelected){
                    await loadTarefas();
                    await setDoc(doc(firestore, "tarefas", tarefaEmEdicao.id), {rotulo: tarefaEmEdicao.rotulo, validar: isSelected}, {merge:  true})
                    await loadTarefas()
                    limparTarefaEmEdicao()
                }else{
                    alert("Não é possível alterar a tarefa sem validar! valide a tarefa! ")
                }
              

            }
           
        }catch (error) {
           console.log(error)
        }
        
    }

    function deleteTarefa (tarefa) {
         Alert.alert("remover Tarefa", 'Tem certeza que deseja remover a tarefa:' + tarefa.rotulo,[
            {text: 'Não'},
            {text: 'Sim',
            onPress: async () => {
                 try{
                   await deleteDoc(doc(firestore, "tarefas", tarefa.id))
                   await loadTarefas()
                  
                 } catch (error) {
                      console.log(error)
                 }
            }
         
            }
         ])
    }

    useEffect(() =>  {
          loadTarefas()
    }, [])

    useEffect(() => {
       if(tarefaEmEdicao.id !==0){
        setTitle('alterar')
       }
    }, [tarefaEmEdicao.id])

      async function onchecked(id, val){
              if(val){
                await setDoc(doc(firestore, "tarefas", id), { validar: val}, {merge:  true})
                await loadTarefas()
                alert("Validado com sucesso!")
                setSelected(val)
              }else{
                 
                await setDoc(doc(firestore, "tarefas", id), { validar: val}, {merge:  true})
                await loadTarefas()
                setSelected(val)
              }

      }

    return (
        <View style={styles.container}>
             <Text style ={{textAlign: 'center', fontSize: 40, fontWeight: 'bold'}}>Tarefas</Text>
             <TextInput style={styles.input} value={tarefaEmEdicao.rotulo} placeholder="Digite uma nova tarefa"
              onChangeText={text => settarefaEmEdicao({id: tarefaEmEdicao.id, rotulo: text})} />
             <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                     <Button title='Limpar' onPress={() => limparTarefaEmEdicao()}/>
                  </View>
                  <View style={styles.button} >
                     <Button title={title} onPress={() => saveTarefa()} />
                  </View>
             </View>
             <Text style ={{textAlign: 'center', fontSize: 40, fontWeight: 'bold'}}>Lista de tarefas</Text>
                <FlatList data={tarefas} renderItem={({item}) =>
                <TouchableHighlight onPress={() => settarefaEmEdicao(item)} onLongPress={() => deleteTarefa(item)}>
                    <View style={styles.list}>
                        <Text style={styles.task}> {item.rotulo} </Text> 
                        <CheckBox value={item.validar} onValueChange={(val) => onchecked(item.id, val)}/>
                    </View>
                </TouchableHighlight>} keyExtractor={item => item.id} />       
        </View>
    )
}

export default MainScreen