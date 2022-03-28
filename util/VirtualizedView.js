import React  from 'react';
import {FlatList} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
 function VirtualizedView(props) {
  
    return (
      <FlatList
        bounces={false}
        data={[]}
        scrollEventThrottle={16}
        ListEmptyComponent={null}
        keyExtractor={() => "dummy"}
        renderItem={null}
        ListHeaderComponent={() => (
          <React.Fragment>{props.children}</React.Fragment>
        )}
        style={{ paddingBottom: 80 }}
      >
      </FlatList>
    );
  }
  export default React.memo(VirtualizedView)