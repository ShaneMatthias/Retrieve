import React, {Component} from 'react';
import {View, Button, Text, Image, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import style from './Style'

class MessageListItem extends Component {
  swipeable = null

  recenter() {
    if (this.swipeable) {
      this.swipeable.recenter()
    }
  }

  render() {
    const {onOpen, onClose, onPress, onDelete, item} = this.props;
    const {contact} = item;
    return (
      <Swipeable
        onRef={ref => this.swipeable = ref}
        onRightButtonsOpenRelease={() => onOpen(this)}
        onRightButtonsCloseRelease={() => onClose(this)}
        rightButtons={[
          <TouchableHighlight
            underlayColor='#ff9eaf'
            style={style.deleteButtonContainerStyle}
            onPress={() => onDelete(item)}
          >
            <View style={style.buttonContainerViewStyle}>
              <Icon color="white" name='delete' size={33}/>
            </View>
          </TouchableHighlight>
        ]}
      >
        <TouchableHighlight onPress={() => onPress()} underlayColor='#e5e5e5'>
          <View style={style.listItemStyle}>
            {contact.photoURL ? 
              <Image
                source={{uri: contact.photoURL}}
                style={style.imageStyle}
              /> :
              <Image 
                source={require('../../assets/images/account_circle.png')}
                style={style.imageStyle}
              />
            }
            <View style={style.textContainerStyle}>
              <Text style={style.textUserNameStyle}>
                {contact.displayName}
              </Text>
              {item.messages ? 
                <Text style={style.textMessageStyle} numberOfLines={1}>
                  {item.messages[item.messages.length - 1].text}
                </Text> : null
              }
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    );
  }
}

export default MessageListItem;