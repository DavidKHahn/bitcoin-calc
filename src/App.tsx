import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { calculateMining } from './src/api/apiService';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

const App: React.FC = () => {
  const [hashRate, setHashRate] = useState('');
  const [powerConsumption, setPowerConsumption] = useState('');
  const [electricityCost, setElectricityCost] = useState('');
  const [initialInvestment, setInitialInvestment] = useState('');
  const [results, setResults] = useState<any>(null);

  const validateInputs = () => {
    if (!hashRate || !powerConsumption || !electricityCost || !initialInvestment) {
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }
    if ([hashRate, powerConsumption, electricityCost, initialInvestment].some(val => isNaN(Number(val)))) {
      Alert.alert('Validation Error', 'Please enter valid numbers.');
      return false;
    }
    return true;
  };

  const handleCalculate = async () => {
    if (!validateInputs()) return;

    try {
      const data = {
        hash_rate: parseFloat(hashRate),
        power_consumption: parseFloat(powerConsumption),
        electricity_cost: parseFloat(electricityCost),
        initial_investment: parseFloat(initialInvestment),
      };
      const result = await calculateMining(data);
      setResults(result);
    } catch (error) {
      Alert.alert('Error', 'Calculation failed. Try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hut 8 BTC Mining Calculator</Text>

      <Text style={styles.label}>Hash Rate (TH/s)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter hash rate"
        placeholderTextColor="#7A7A7A"
        value={hashRate}
        onChangeText={setHashRate}
      />

      <Text style={styles.label}>Power Consumption (Watts)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter power consumption"
        placeholderTextColor="#7A7A7A"
        value={powerConsumption}
        onChangeText={setPowerConsumption}
      />

      <Text style={styles.label}>Electricity Cost (USD/kWh)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter electricity cost"
        placeholderTextColor="#7A7A7A"
        value={electricityCost}
        onChangeText={setElectricityCost}
      />

      <Text style={styles.label}>Initial Investment (USD)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter initial investment"
        placeholderTextColor="#7A7A7A"
        value={initialInvestment}
        onChangeText={setInitialInvestment}
      />

      <View style={styles.buttonContainer}>
        <Button title="Calculate" onPress={handleCalculate} color="#F7931A" />
      </View>

      {results && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultTitle}>Results</Text>
          <Text>Daily Cost: ${results.dailyCost}</Text>
          <Text>Monthly Cost: ${results.monthlyCost}</Text>
          <Text>Yearly Cost: ${results.yearlyCost}</Text>
          <Text>Daily Revenue (USD): ${results.dailyRevenueUSD}</Text>
          <Text>Monthly Revenue (USD): ${results.monthlyRevenueUSD}</Text>
          <Text>Yearly Revenue (USD): ${results.yearlyRevenueUSD}</Text>
          <Text>Daily Revenue (BTC): {results.dailyRevenueBTC}</Text>
          <Text>Monthly Revenue (BTC): {results.monthlyRevenueBTC}</Text>
          <Text>Yearly Revenue (BTC): {results.yearlyRevenueBTC}</Text>
          <Text>Daily Profit (USD): ${results.dailyProfitUSD}</Text>
          <Text>Monthly Profit (USD): ${results.monthlyProfitUSD}</Text>
          <Text>Yearly Profit (USD): ${results.yearlyProfitUSD}</Text>
          <Text>Breakeven Timeline (Months): {results.breakevenTimeline}</Text>
          <Text>Cost to Mine 1 BTC: ${results.costToMine}</Text>
        </View>
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: isLargeScreen ? '60%' : '80%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    padding: isLargeScreen ? 40 : 20,
    width: '100%',
  },
  input: {
    borderColor: '#00796B',
    borderRadius: 5,
    borderWidth: 1,
    color: '#000',
    marginBottom: 10,
    padding: 10,
    width: isLargeScreen ? '80%' : '100%',
  },
  label: {
    color: '#00796B',
    fontSize: isLargeScreen ? 18 : 16,
    marginTop: 15,
  },
  resultTitle: {
    color: '#000',
    fontSize: isLargeScreen ? 22 : 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  resultsContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginTop: 20,
    padding: isLargeScreen ? 30 : 20,
    width: '100%',
  },
  title: {
    color: '#000',
    fontSize: isLargeScreen ? 28 : 24,
    fontWeight: '600',
    marginBottom: isLargeScreen ? 30 : 20,
    paddingTop: isLargeScreen ? 40 : 20,
  },
});


export default App;
