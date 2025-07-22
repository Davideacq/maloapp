// Converted from malohr-platform/app/user/onboarding/page.tsx
// User onboarding wizard with multi-step form for preferences
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppIcon } from '../../../src/components/app-icon';
import { Button } from '../../../src/components/button';
import { Card, CardContent } from '../../../src/components/card';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    workStress: [] as string[],
    interests: [] as string[],
    goals: [] as string[],
    availability: '',
    experience: '',
  });

  const steps = [
    {
      title: 'Benvenuto in MaloHR!',
      description: 'Iniziamo il tuo percorso di benessere personalizzato',
      type: 'welcome',
    },
    {
      title: 'Aree di Stress',
      description: 'Seleziona le aree che ti causano maggiore stress al lavoro',
      type: 'multiple',
      key: 'workStress',
      options: [
        { id: 'workload', label: 'Carico di lavoro eccessivo', icon: '📊' },
        { id: 'deadlines', label: 'Scadenze pressanti', icon: '⏰' },
        { id: 'relationships', label: 'Rapporti con colleghi', icon: '👥' },
        { id: 'management', label: 'Gestione del team', icon: '👔' },
        { id: 'changes', label: 'Cambiamenti organizzativi', icon: '🔄' },
        { id: 'balance', label: 'Work-life balance', icon: '⚖️' },
      ],
    },
    {
      title: 'Interessi e Preferenze',
      description: 'Cosa ti interessa di più per il tuo benessere?',
      type: 'multiple',
      key: 'interests',
      options: [
        { id: 'mindfulness', label: 'Mindfulness e meditazione', icon: '🧘' },
        { id: 'exercise', label: 'Attività fisica', icon: '🏃' },
        { id: 'nutrition', label: 'Alimentazione sana', icon: '🥗' },
        { id: 'sleep', label: 'Miglioramento del sonno', icon: '😴' },
        { id: 'communication', label: 'Comunicazione efficace', icon: '💬' },
        { id: 'time-management', label: 'Gestione del tempo', icon: '⏱️' },
      ],
    },
    {
      title: 'Obiettivi Personali',
      description: 'Quali sono i tuoi obiettivi principali?',
      type: 'multiple',
      key: 'goals',
      options: [
        { id: 'stress-reduction', label: 'Ridurre lo stress', icon: '😌' },
        { id: 'productivity', label: 'Aumentare la produttività', icon: '📈' },
        { id: 'confidence', label: "Migliorare l'autostima", icon: '💪' },
        { id: 'relationships', label: 'Migliorare le relazioni', icon: '❤️' },
        { id: 'focus', label: 'Aumentare la concentrazione', icon: '🎯' },
        { id: 'happiness', label: 'Essere più felice', icon: '😊' },
      ],
    },
    {
      title: 'Disponibilità',
      description: 'Quando preferisci fare le sessioni?',
      type: 'single',
      key: 'availability',
      options: [
        { id: 'morning', label: 'Mattina (9:00 - 12:00)', icon: '🌅' },
        { id: 'lunch', label: 'Pausa pranzo (12:00 - 14:00)', icon: '🍽️' },
        { id: 'afternoon', label: 'Pomeriggio (14:00 - 17:00)', icon: '☀️' },
        { id: 'evening', label: 'Sera (17:00 - 19:00)', icon: '🌆' },
      ],
    },
    {
      title: 'Esperienza Precedente',
      description: 'Hai mai fatto terapia o consulenza psicologica?',
      type: 'single',
      key: 'experience',
      options: [
        { id: 'never', label: 'Mai', icon: '🆕' },
        { id: 'some', label: 'Qualche volta', icon: '📚' },
        { id: 'regular', label: 'Regolarmente', icon: '✅' },
        { id: 'prefer-not', label: 'Preferisco non rispondere', icon: '🤐' },
      ],
    },
  ];

  const handleOptionSelect = (key: string, optionId: string, isMultiple: boolean) => {
    if (isMultiple) {
      setAnswers((prev) => ({
        ...prev,
        [key]: (prev[key as keyof typeof prev] as string[]).includes(optionId)
          ? (prev[key as keyof typeof prev] as string[]).filter((id) => id !== optionId)
          : [...(prev[key as keyof typeof prev] as string[]), optionId],
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [key]: optionId,
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      Alert.alert('Onboarding Completato!', 'Il tuo profilo è stato configurato con successo.', [
        {
          text: 'Continua',
          onPress: () => router.push('/user/dashboard' as any),
        },
      ]);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isWelcomeStep = currentStepData.type === 'welcome';

  const renderWelcomeStep = () => (
    <View style={styles.welcomeContainer}>
      <View style={styles.welcomeIcon}>
        <AppIcon name="user" size={64} style={{ tintColor: '#3b82f6' }} />
      </View>
      <Text style={styles.welcomeTitle}>{currentStepData.title}</Text>
      <Text style={styles.welcomeDescription}>{currentStepData.description}</Text>
      <View style={styles.welcomeFeatures}>
        <View style={styles.featureItem}>
          <AppIcon name="check" size={24} style={{ tintColor: '#10b981' }} />
          <Text style={styles.featureText}>Sessioni personalizzate</Text>
        </View>
        <View style={styles.featureItem}>
          <AppIcon name="check" size={24} style={{ tintColor: '#10b981' }} />
          <Text style={styles.featureText}>Supporto professionale</Text>
        </View>
        <View style={styles.featureItem}>
          <AppIcon name="check" size={24} style={{ tintColor: '#10b981' }} />
          <Text style={styles.featureText}>Massima riservatezza</Text>
        </View>
      </View>
    </View>
  );

  const renderOptionsStep = () => (
    <View style={styles.optionsContainer}>
      <Text style={styles.stepTitle}>{currentStepData.title}</Text>
      <Text style={styles.stepDescription}>{currentStepData.description}</Text>
      
      <View style={styles.optionsGrid}>
        {currentStepData.options?.map((option) => {
          const isSelected = currentStepData.type === 'multiple'
            ? (answers[currentStepData.key as keyof typeof answers] as string[]).includes(option.id)
            : answers[currentStepData.key as keyof typeof answers] === option.id;

          return (
            <Pressable
              key={option.id}
              onPress={() => handleOptionSelect(currentStepData.key!, option.id, currentStepData.type === 'multiple')}
              style={[styles.optionCard, isSelected && styles.selectedOption]}
            >
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text style={[styles.optionLabel, isSelected && styles.selectedOptionText]}>
                {option.label}
              </Text>
              {isSelected && (
                <View style={styles.checkmark}>
                  <Ionicons name="checkmark" size={20} color="white" />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>
            Passo {currentStep + 1} di {steps.length}
          </Text>
          <Text style={styles.progressPercentage}>
            {Math.round(((currentStep + 1) / steps.length) * 100)}% completato
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${((currentStep + 1) / steps.length) * 100}%` }
            ]}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.stepCard}>
          <CardContent style={styles.stepContent}>
            {isWelcomeStep ? renderWelcomeStep() : renderOptionsStep()}
          </CardContent>
        </Card>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {currentStep > 0 && (
          <Pressable onPress={prevStep} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#6b7280" />
            <Text style={styles.backButtonText}>Indietro</Text>
          </Pressable>
        )}
        
        <View style={styles.nextButtonContainer}>
          <Button onPress={nextStep} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>
              {isLastStep ? 'Completa' : 'Continua'}
            </Text>
            <Ionicons 
              name={isLastStep ? "checkmark" : "chevron-forward"} 
              size={20} 
              color="white" 
            />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  progressContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  stepCard: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  stepContent: {
    padding: 24,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  welcomeIcon: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeDescription: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
  },
  welcomeFeatures: {
    alignSelf: 'stretch',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#374151',
  },
  optionsContainer: {
    paddingVertical: 16,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  stepDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  optionCard: {
    width: '47%',
    minHeight: 120,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  selectedOption: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  optionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    lineHeight: 20,
  },
  selectedOptionText: {
    color: '#1e40af',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#6b7280',
  },
  nextButtonContainer: {
    flex: 1,
    marginLeft: 16,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 8,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
}); 