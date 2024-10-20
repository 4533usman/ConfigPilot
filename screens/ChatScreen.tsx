import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { OpenAI } from 'openai';
import * as FileSystem from 'expo-file-system';
import Markdown from 'react-native-markdown-display';

const { width, height } = Dimensions.get('window');
const api = new OpenAI({ apiKey: 'API_KEY', baseURL: 'https://api.aimlapi.com' });

const ChatScreen = ({ route }) => {
    const { active, routertype } = route.params;
    const [prompt, setPrompt] = useState<any>('');
    const [image, setImage] = useState(null);
    const [aiResponse, setAiResponse] = useState<any>([]);
    const [loading, setLoading] = useState(false)
    const [encodeImage, setEncodeImage] = useState(null);
    const scrollViewRef = useRef<ScrollView>(null);

    console.log('active', active, routertype);

    const handleAttachImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            setEncodeImage(`data:image/jpeg;base64,${base64}`);
            setImage(result.assets[0].uri);
            console.log(`data:image/jpeg;base64,${base64}`)
            ToastAndroid.showWithGravity('Image Uploaded', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    };

    const handleSend = async () => {
        // if (!prompt || !image) {
        //     alert('Please enter a message');
        //     return;
        // }

        try {
            setLoading(true);
            if (image) {
                const result = await fetch("https://api.aimlapi.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer API_KEY",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
                        max_tokens: 300,
                        messages: [
                            {
                                role: "user",
                                content: [
                                    {
                                        type: "text",
                                        text: `I am trying to configure a ${active}. 
                                    I am facing the following issue: ${prompt}. 
                                    I need configuration specifically for this  ${routertype}. 
                                    Please analyze the situation thoroughly and suggest effective troubleshooting steps or best practices that could help resolve the issue. 
                                    Consider potential causes and solutions, and provide detailed explanations or recommendations.`,
                                    },
                                    {
                                        role: "user",
                                        type: "image_url",
                                        image_url: {
                                            url: encodeImage,
                                        },
                                    },
                                ],
                            },
                        ],
                    }),
                }).then((res) => res.json());

                const message = result.choices[0].message.content;
                const resObj = {
                    promptSend: prompt,
                    responseBack: message,
                    uri: image
                }
                setAiResponse([...aiResponse, resObj]);
                console.log(`Assistant: ${message}`);
            }
            else {

                const result: any = await api.chat.completions.create({
                    model: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
                    messages: [
                        {
                            role: "system",
                            content:`You are an AI assistant designed to help users configure routers efficiently and accurately. 
                                    I am trying to configure a ${active}.  
                                    I need configuration specifically for this  ${routertype}. 
                                    Please analyze the situation thoroughly and suggest effective troubleshooting steps or best practices that could help resolve the issue. 
                                    Consider potential causes and solutions, and provide detailed explanations or recommendations.`
                        },
                        {
                            role: "user",
                            content: `I am facing the following issue: ${prompt}.`,
                        },
                    ],
                });
                const message = result.choices[0].message.content;
                const resObj = {
                    promptSend: prompt,
                    responseBack: message
                }
                setAiResponse([...aiResponse, resObj]);

            }

            ToastAndroid.showWithGravity('AI Response Received', ToastAndroid.SHORT, ToastAndroid.CENTER);
        } catch (error) {
            console.error('Error with OpenAI API:', error.message);
            alert('Something went wrong with the OpenAI API');
        }

        setPrompt('');
        setImage(null);
        setLoading(false);
    };

    const delImageHandler = () => {
        setImage(null);
        ToastAndroid.showWithGravity('Image Deleted', ToastAndroid.SHORT, ToastAndroid.CENTER);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}
        >
            <View style={styles.chatContainer}>
                <View style={styles.banner}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', padding: 10 }}>Chat with ConfigPilot – Your Guide to Effortless Network Navigation!</Text>
                </View>
                {loading ?
                    <View style={styles.chatScroll}>
                        <Text>Generating Response------</Text>
                    </View>
                    : <ScrollView
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                        style={styles.chatScroll}
                        showsVerticalScrollIndicator={false}
                    >
                        {aiResponse.map((r: any, index: number) => (
                            <View key={index}>
                                <View>
                                    <MaterialIcons name="supervised-user-circle" size={24} color="#0d0c32" />
                                    <Text style={styles.chatText}>You: {r?.promptSend}</Text>
                                    {r.uri && <Image source={{ uri: r?.uri }} style={styles.attachedImage} />}
                                </View>
                                <MaterialCommunityIcons name="robot-outline" size={24} color="#0d0c32" />
                                <Markdown>
                                    {r?.responseBack}
                                </Markdown>
                            </View>
                        ))}
                    </ScrollView>}

                {image && (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.attachedImage} />
                        <TouchableOpacity style={styles.iconButton} onPress={delImageHandler}>
                            <MaterialIcons name="close" size={14} color="#0d0c32" />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.iconButton} onPress={handleAttachImage}>
                        <MaterialIcons name="attach-file" size={24} color="#0d0c32" />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={prompt}
                        onChangeText={setPrompt}
                    />

                    <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
                        <MaterialIcons name="send" size={24} color="#0d0c32" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0c32',
    },
    chatContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    chatScroll: {
        flex: 1,
        paddingHorizontal: 10,
        // paddingVertical: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: 'white'
    },
    attachedImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 5,
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginHorizontal: 5,
    },
    iconButton: {
        padding: 5,
    },
    chatText: {
        fontSize: 16,
        marginVertical: 4,
        backgroundColor: 'lightgrey',
        padding: 10,
        borderRadius: 10,
    },
    banner: {
        backgroundColor: '#0d0c32',
        paddingHorizontal: 10,
        paddingVertical: 50
    }
});

export default ChatScreen;
