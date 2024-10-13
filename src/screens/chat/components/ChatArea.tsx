import {AppText} from '@/components/common';
import {
  AttachmentIcon,
  CameraIcon,
  ChevronRightIcon,
  SendIcon,
  XIcon,
} from '@/components/icons';
import MediaIcon from '@/components/icons/MediaIcon';
import {useChatContext} from '@/context';
import {
  UploadResponseDto,
  useDeleteUploadMutation,
  useUploadMutation,
} from '@/services/upload';
import {colors, families} from '@/theme';
import {EContentType} from '@/types/enums';
import {fileIcon} from '@/utils/file-icon';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {pickSingle, types} from 'react-native-document-picker';
import {openCamera, openPicker} from 'react-native-image-crop-picker';

type Props = {
  roomId: string;
};

const ChatArea = ({roomId}: Props) => {
  const {content, setContent, hasContent, inputRef, isSending, sendMessage} =
    useChatContext();
  const [height, setHeight] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const [fileMeta, setFileMeta] = useState<UploadResponseDto | null>(null);
  const [uri, setUri] = useState('');
  const [contentType, setContentType] = useState(EContentType.TEXT);
  const [progress, setProgress] = useState(0);
  const deleteFileMutation = useDeleteUploadMutation();
  const uploadFileMutation = useUploadMutation();

  const handleUpload = async (formData: FormData) => {
    uploadFileMutation.mutate(formData, {
      onSuccess: res => {
        console.log(res);
        setFileMeta(res.data);
      },
      onError: err => {
        setFileMeta(null);
        setUri('');
      },
    });
  };

  const upload = (type: 'camera' | 'picker') => {
    const handler = type === 'camera' ? openCamera : openPicker;

    handler({
      cropping: true,
      width: 300,
      height: 300,
      mediaType: 'photo',
    })
      .then(async res => {
        console.log(res);
        setContentType(EContentType.IMAGE);
        setUri(res.path);
        const formData = new FormData();
        formData.append('file', {
          uri: res.path,
          name: res.path.split('/').pop(),
          type: res.mime,
        });
        await handleUpload(formData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onRemoveFile = () => {
    if (fileMeta) {
      deleteFileMutation.mutate(fileMeta.publicId, {
        onSuccess: () => {},
        onError: () => {},
      });
      setFileMeta(null);
    }
    setUri('');
  };

  const ACTIONS = [
    {
      icon: AttachmentIcon,
      onPress: () => {
        pickSingle({
          type: [types.pdf, types.xls, types.xlsx],
          allowMultiSelection: false,
        })
          .then(async res => {
            console.log(res);
            setUri(res.uri);
            setContentType(EContentType.DOCUMENT);
            const formData = new FormData();
            formData.append('file', {
              uri: res.uri,
              name: res.name,
              type: res.type,
            });
            await handleUpload(formData);
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
    {
      icon: CameraIcon,
      onPress: () => upload('camera'),
    },
    {
      icon: MediaIcon,
      onPress: () => upload('picker'),
    },
  ];

  const onSend = () => {
    sendMessage({
      room: roomId,
      question: {
        content,
        contentType,
        extra: fileMeta ? {file: fileMeta.url} : undefined,
      },
    });
    setFileMeta(null);
    setUri('');
  };

  useEffect(() => {
    if (!hasContent) {
      setIsExpanded(false);
    }
  }, [hasContent]);

  return (
    <View>
      {(fileMeta || uri !== '') && (
        <View style={styles.fileContainer}>
          <View
            style={[
              styles.file,
              {
                width: !fileMeta && uri ? 180 : 'auto',
                height: !fileMeta && uri ? 60 : 'auto',
              },
            ]}>
            {contentType === EContentType.IMAGE ? (
              <Image
                source={{uri: uri || fileMeta?.url}}
                style={{width: 100, height: 100}}
              />
            ) : (
              fileMeta && (
                <>
                  <Image
                    source={fileIcon(fileMeta.format)}
                    style={{width: 40, height: 40}}
                    resizeMode="contain"
                  />
                  <AppText>
                    {fileMeta instanceof File
                      ? fileMeta.name
                      : fileMeta.originalFilename}{' '}
                    - {(fileMeta.size / 1024).toFixed(2)} KB
                  </AppText>
                </>
              )
            )}
            {!fileMeta && (
              <View style={styles.progress}>
                <AppText color={colors.white}>Đang tải lên...</AppText>
                <AppText color={colors.white}>{progress}%</AppText>
              </View>
            )}
            {(fileMeta || uri) && (
              <Pressable
                onPress={onRemoveFile}
                style={styles.deleteFileBtn}
                hitSlop={14}>
                <XIcon stroke={colors.white} size={16} />
              </Pressable>
            )}
          </View>
        </View>
      )}
      <View style={styles.container}>
        {!isExpanded &&
          ACTIONS.map(({icon: Icon, onPress}, index) => (
            <TouchableOpacity onPress={onPress} key={index}>
              <Icon stroke={colors.main} />
            </TouchableOpacity>
          ))}
        {isExpanded && (
          <Pressable
            style={{alignSelf: height > 40 ? 'flex-end' : 'center'}}
            onPress={() => setIsExpanded(false)}>
            <ChevronRightIcon stroke={colors.main} size={24} />
          </Pressable>
        )}
        <TextInput
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
          onContentSizeChange={e => setHeight(e.nativeEvent.contentSize.height)}
          ref={inputRef}
          value={content}
          onChangeText={text => {
            setContent(text);
            !isExpanded && setIsExpanded(true);
          }}
          placeholder="Aa"
          style={[
            styles.input,
            {
              height: Math.max(40, height),
            },
          ]}
          multiline
          onSubmitEditing={onSend}
        />
        <Pressable
          disabled={!hasContent}
          onPress={onSend}
          style={{alignSelf: height > 40 ? 'flex-end' : 'center'}}>
          <SendIcon stroke={colors.main} />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatArea;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontSize: 14,
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    flex: 1,
    maxHeight: 100,
    fontFamily: families.regular,
    color: colors.black,
  },
  fileContainer: {
    padding: 10,
  },
  file: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    alignSelf: 'flex-start',
    borderRadius: 10,
    overflow: 'hidden',
  },
  deleteFileBtn: {
    borderRadius: 100,
    alignSelf: 'flex-start',
    position: 'absolute',
    right: 2,
    top: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});
