import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { Button } from '@/components/Button';

type AccordionItemProps = {
  title: string;
  status: string;
};

const AccordionItem = ({ title, status }: AccordionItemProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="w-full my-2">
      <Pressable
        className="p-4 bg-gray-100 rounded-lg"
        onPress={() => setExpanded(!expanded)}
      >
        <Text className="text-lg font-medium">{title}</Text>
      </Pressable>
      {expanded && (
        <View className="p-4 bg-gray-200 rounded-lg mt-2">
          <Text className="text-base mb-2">Status: {status}</Text>
          <Button
            title="Ver Detalhes"
            onPress={() => router.push("/DetalhesScreen")}
          />
        </View>
      )}
    </View>
  );
};

const data = [
  { title: 'Consulta 1', status: 'Aguardando' },
  { title: 'Consulta 2', status: 'Confirmada' },
  { title: 'Consulta 3', status: 'Cancelada' },
  { title: 'Consulta 4', status: 'Negada' },
  { title: 'Consulta 5', status: 'Finalizada' },
];

export default function MarcacoesScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Minhas Marcações</Text>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <AccordionItem title={item.title} status={item.status} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
}
