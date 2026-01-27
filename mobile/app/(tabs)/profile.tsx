import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'

const ProfileTab =() => {
  const {signOut} = useAuth();

  return (
    <ScrollView
      className="bg-surface"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-primary mt-10 ">Profile Chat</Text>
      <Pressable onPress={() => signOut()} className='mt-4 bg-red-600 px-4 py-2' >
        <Text>Sign Out</Text>
      </Pressable>
    </ScrollView>
  )
}

export default ProfileTab