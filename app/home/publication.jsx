import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Pressable, Modal, Alert } from 'react-native';
import { theme } from '../../constants/theme';

const PublicationFeed = () => {
    const [publications, setPublications] = useState([
        {
            title: 'Stadium for Rent',
            content: 'Looking to rent a stadium for an event. Please contact me for more details.',
            author: 'Alice Johnson',
            datePublished: new Date().toISOString(),
            tags: ['stadium', 'rent'],
            imageUrl: require('../../assets/images/Stade.jpg'), // Local image
            comments: [],
        },
        {
            title: 'Need a Player for the Team',
            content: 'We are looking for a midfielder to join our team for the upcoming season.',
            author: 'Bob Smith',
            datePublished: new Date().toISOString(),
            tags: ['team', 'join'],
            imageUrl: require('../../assets/images/team.jpg'), // Local image
            comments: [],
        },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [newPublication, setNewPublication] = useState({
        title: '',
        content: '',
        author: 'Current User',
        datePublished: new Date().toISOString(),
        tags: [],
        imageUrl: '',
        comments: [],
    });
    const [comment, setComment] = useState('');
    const [selectedPublicationIndex, setSelectedPublicationIndex] = useState(null);

    const handleAddPublication = () => {
        if (newPublication.title && newPublication.content) {
            setPublications([...publications, newPublication]);
            setNewPublication({
                title: '',
                content: '',
                author: 'Current User',
                datePublished: new Date().toISOString(),
                tags: [],
                imageUrl: '',
                comments: [],
            });
            setModalVisible(false);
        } else {
            Alert.alert('Error', 'Title and content are required!');
        }
    };

    const handleAddComment = (index) => {
        if (comment.trim()) {
            const updatedPublications = [...publications];
            updatedPublications[index].comments.push(comment);
            setPublications(updatedPublications);
            setComment('');
        }
    };

    const openComments = (index) => {
        setSelectedPublicationIndex(index);
        setModalVisible(true);
    };

    const closeComments = () => {
        setModalVisible(false);
        setSelectedPublicationIndex(null);
    };

    return (
        <View style={styles.container}>
                         {/* <Header  title="Publications" /> */}

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Fil d'actualité</Text>
                <Pressable style={styles.addPublicationButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.addPublicationText}>Add Publication</Text>
                </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {publications.map((publication, index) => (
                    <View key={index} style={styles.card}>
                        <Image
                            source={typeof publication.imageUrl === 'number' ? publication.imageUrl : { uri: publication.imageUrl }}
                            style={styles.image}
                        />
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>{publication.title}</Text>
                            <Text style={styles.author}>By {publication.author}</Text>
                            <Text style={styles.date}>
                                {new Date(publication.datePublished).toLocaleDateString()}
                            </Text>
                            <Text style={styles.content}>{publication.content}</Text>
                            {publication.tags.length > 0 && (
                                <View style={styles.tagContainer}>
                                    {publication.tags.map((tag, idx) => (
                                        <Text key={idx} style={styles.tag}>
                                            #{tag}
                                        </Text>
                                    ))}
                                </View>
                            )}
                            <Pressable onPress={() => openComments(index)} style={styles.commentButton}>
                                <Text style={styles.commentButtonText}>
                                    {publication.comments.length} Comments
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Modal for Adding Publication */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add Publication</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={newPublication.title}
                            onChangeText={(text) => setNewPublication({ ...newPublication, title: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Content"
                            value={newPublication.content}
                            onChangeText={(text) => setNewPublication({ ...newPublication, content: text })}
                            multiline
                            textAlignVertical="top"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Image URL (optional)"
                            value={newPublication.imageUrl}
                            onChangeText={(text) => setNewPublication({ ...newPublication, imageUrl: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Tags (comma separated)"
                            value={newPublication.tags.join(', ')}
                            onChangeText={(text) => setNewPublication({ 
                                ...newPublication, 
                                tags: text.split(',').map(tag => tag.trim())
                            })}
                        />
                        <View style={styles.buttonContainer}>
                            <Pressable onPress={handleAddPublication} style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </Pressable>
                            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal for Comments */}
            <Modal visible={selectedPublicationIndex !== null} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Comments</Text>
                        {selectedPublicationIndex !== null && (
                            <>
                                {publications[selectedPublicationIndex].comments.map((comment, idx) => (
                                    <Text key={idx} style={styles.commentText}>
                                        {comment}
                                    </Text>
                                ))}
                                <TextInput
                                    style={styles.commentInput}
                                    placeholder="Add a comment..."
                                    value={comment}
                                    onChangeText={setComment}
                                    onSubmitEditing={() => handleAddComment(selectedPublicationIndex)}
                                />
                            </>
                        )}
                        <Pressable onPress={closeComments} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.colors.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: theme.fonts.bold,
        color: theme.colors.text,
    },
    addPublicationButton: {
        backgroundColor: theme.colors.green,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: theme.radius.sm,
    },
    addPublicationText: {
        color: '#fff',
        fontWeight: theme.fonts.semibold,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: theme.radius.md,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 15,
        overflow: 'hidden',
    },
    cardContent: {
        padding: 15,
    },
    image: {
        width: '100%',
        height: 200,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.darkLight,
    },
    title: {
        fontSize: 18,
        fontWeight: theme.fonts.bold,
        marginBottom: 5,
    },
    author: {
        fontSize: 14,
        color: theme.colors.textLight,
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: theme.colors.textLight,
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        marginBottom: 10,
        color: theme.colors.text,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    tag: {
        backgroundColor: theme.colors.green,
        borderRadius: theme.radius.xs,
        padding: 5,
        margin: 2,
        fontSize: 12,
        color: '#fff',
    },
    commentButton: {
        marginVertical: 10,
    },
    commentButtonText: {
        color: theme.colors.primary,
        fontWeight: theme.fonts.semibold,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: theme.colors.gray,
        borderRadius: theme.radius.sm,
        padding: 10,
        marginTop: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: theme.radius.md,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: theme.fonts.bold,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.gray,
        borderRadius: theme.radius.sm,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: theme.colors.green,
        padding: 10,
        borderRadius: theme.radius.sm,
        flex: 1,
        marginRight: 10,
    },
    submitButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: theme.colors.gray,
        padding: 10,
        borderRadius: theme.radius.sm,
        flex: 1,
    },
    closeButtonText: {
        textAlign: 'center',
        color: '#fff',
    },
    commentText: {
        marginBottom: 5,
        fontSize: 16,
        color: theme.colors.text,
    },
});

export default PublicationFeed;
