// Complete styleguide with 8-point design system
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Accordion } from '../../src/components/accordion';
import { Avatar } from '../../src/components/avatar';
import { Badge } from '../../src/components/badge';
import { Button } from '../../src/components/button';
import { Card, CardContent, CardHeader } from '../../src/components/card';
import { Carousel } from '../../src/components/carousel';
import { Checkbox } from '../../src/components/checkbox';
import { Dialog } from '../../src/components/dialog';
import { Input } from '../../src/components/input';
import { RadioGroup } from '../../src/components/radio-group';
import { Skeleton } from '../../src/components/skeleton';
import { Slider } from '../../src/components/slider';
import { Switch } from '../../src/components/switch';
import { TextArea } from '../../src/components/textarea';
import { Toggle } from '../../src/components/toggle';
import { Tooltip } from '../../src/components/tooltip';
import {
  Body,
  BodyBold,
  BodyLarge,
  BodyRegular,
  BodySmall, Caption,
  H1, H2, H3, H4,
  Label
} from '../../src/components/typography';
import { useTypography } from '../../src/hooks/use-typography';

export default function StyleguidePage() {
  const { typography, fontsLoaded } = useTypography();
  const [activeTab, setActiveTab] = useState('design-system');
  
  // Component states
  const [demoText, setDemoText] = useState('Testo di esempio');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  
  // New component states
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [switchChecked, setSwitchChecked] = useState(false);
  const [togglePressed, setTogglePressed] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<string[]>([]);

  const handleBackToHome = () => {
    router.push('/home' as any);
  };

  const tabs = [
    { id: 'design-system', label: 'Design System', icon: 'color-palette' },
    { id: 'typography', label: 'Typography', icon: 'text' },
    { id: 'components', label: 'Components', icon: 'apps' },
    { id: 'forms', label: 'Forms', icon: 'document-text' },
    { id: 'feedback', label: 'Feedback', icon: 'chatbubble' },
    { id: 'navigation', label: 'Navigation', icon: 'navigate' },
    { id: 'data-display', label: 'Data Display', icon: 'stats-chart' },
    { id: 'user-cards', label: 'User Cards', icon: 'person' },
  ];

  const toggleOption = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Caricamento font...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderDesignSystemSection = () => (
    <View style={styles.section}>
      <H2 color="#1f2937">Design System - 8pt Grid</H2>
      
      {/* Spacing Scale */}
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Spacing Scale</H3>
          <BodySmall color="#6b7280">8-point grid system for consistent spacing</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.spacingDemo}>
            {[0, 8, 16, 24, 32, 40, 48, 56, 64].map((spacing) => (
              <View key={spacing} style={styles.spacingItem}>
                <View style={[styles.spacingBox, { width: spacing, height: spacing }]} />
                <Text style={styles.spacingLabel}>{spacing}px</Text>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Color Palette</H3>
          <BodySmall color="#6b7280">Brand colors and semantic colors</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.colorPalette}>
            <View style={styles.colorSection}>
              <Label color="#374151">Primary (Orange)</Label>
              <View style={styles.colorRow}>
                {['#fed7aa', '#f97316', '#ea580c', '#9a3412'].map((color, index) => (
                  <View key={color} style={styles.colorItem}>
                    <View style={[styles.colorSwatch, { backgroundColor: color }]} />
                    <Text style={styles.colorName}>{['100', '500', '600', '900'][index]}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.colorSection}>
              <Label color="#374151">Secondary (Teal)</Label>
              <View style={styles.colorRow}>
                {['#ccfbf1', '#14b8a6', '#0d9488', '#134e4a'].map((color, index) => (
                  <View key={color} style={styles.colorItem}>
                    <View style={[styles.colorSwatch, { backgroundColor: color }]} />
                    <Text style={styles.colorName}>{['100', '500', '600', '900'][index]}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.colorSection}>
              <Label color="#374151">Accent (Blue)</Label>
              <View style={styles.colorRow}>
                {['#dbeafe', '#3b82f6', '#2563eb', '#1e3a8a'].map((color, index) => (
                  <View key={color} style={styles.colorItem}>
                    <View style={[styles.colorSwatch, { backgroundColor: color }]} />
                    <Text style={styles.colorName}>{['100', '500', '600', '900'][index]}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.colorSection}>
              <Label color="#374151">Semantic Colors</Label>
              <View style={styles.colorRow}>
                {[
                  { color: '#10b981', name: 'Success' },
                  { color: '#f59e0b', name: 'Warning' },
                  { color: '#ef4444', name: 'Error' },
                  { color: '#6b7280', name: 'Neutral' }
                ].map((item) => (
                  <View key={item.color} style={styles.colorItem}>
                    <View style={[styles.colorSwatch, { backgroundColor: item.color }]} />
                    <Text style={styles.colorName}>{item.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Border Radius */}
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Border Radius</H3>
          <BodySmall color="#6b7280">Consistent border radius values</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.borderRadiusDemo}>
            {[0, 4, 6, 8, 12, 16, 24, 50].map((radius) => (
              <View key={radius} style={styles.borderRadiusItem}>
                <View style={[styles.borderRadiusBox, { borderRadius: radius }]} />
                <Text style={styles.borderRadiusLabel}>{radius}px</Text>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>

      {/* Shadows */}
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Shadows & Elevation</H3>
          <BodySmall color="#6b7280">Depth and elevation system</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.shadowDemo}>
            {[1, 2, 4, 8, 16].map((elevation) => (
              <View key={elevation} style={styles.shadowItem}>
                <View style={[styles.shadowBox, { elevation }]} />
                <Text style={styles.shadowLabel}>Elevation {elevation}</Text>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>
    </View>
  );

  const renderTypographySection = () => (
    <View style={styles.section}>
      <H2 color="#1f2937">Typography - 8pt Scale</H2>
      
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Font Scale</H3>
          <BodySmall color="#6b7280">Typography scale based on 8pt grid</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.typographyDemo}>
            <View style={styles.typographySection}>
              <Label color="#374151">Headings</Label>
              <H1 color="#1f2937">H1 - 32px (4 × 8px)</H1>
              <H2 color="#1f2937">H2 - 24px (3 × 8px)</H2>
              <H3 color="#1f2937">H3 - 20px (2.5 × 8px)</H3>
              <H4 color="#1f2937">H4 - 18px (2.25 × 8px)</H4>
            </View>

            <View style={styles.typographySection}>
              <Label color="#374151">Body Text</Label>
              <BodyLarge color="#374151">BodyLarge - 18px (2.25 × 8px)</BodyLarge>
              <Body color="#374151">Body - 16px (2 × 8px)</Body>
              <BodySmall color="#6b7280">BodySmall - 14px (1.75 × 8px)</BodySmall>
              <Caption color="#9ca3af">Caption - 12px (1.5 × 8px)</Caption>
            </View>

            <View style={styles.typographySection}>
              <Label color="#374151">Special Variants</Label>
              <BodyRegular color="#374151">BodyRegular - 16px</BodyRegular>
              <BodyBold color="#374151">BodyBold - 16px</BodyBold>
              <Label color="#374151">Label - 14px</Label>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );

  const renderComponentsSection = () => (
    <View style={styles.section}>
      <H2 color="#1f2937">Core Components</H2>
      
      {/* Buttons */}
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Buttons</H3>
          <BodySmall color="#6b7280">All button variants with 8pt spacing</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.componentGrid}>
            <View style={styles.componentRow}>
              <View style={styles.componentItem}>
                <Label color="#374151">Default</Label>
                <Button variant="default" onPress={() => Alert.alert('Button', 'Default pressed')}>
                  Default
                </Button>
              </View>
              <View style={styles.componentItem}>
                <Label color="#374151">Secondary</Label>
                <Button variant="secondary" onPress={() => Alert.alert('Button', 'Secondary pressed')}>
                  Secondary
                </Button>
              </View>
            </View>
            
            <View style={styles.componentRow}>
              <View style={styles.componentItem}>
                <Label color="#374151">Outline</Label>
                <Button variant="outline" onPress={() => Alert.alert('Button', 'Outline pressed')}>
                  Outline
                </Button>
              </View>
              <View style={styles.componentItem}>
                <Label color="#374151">Destructive</Label>
                <Button variant="destructive" onPress={() => Alert.alert('Button', 'Destructive pressed')}>
                  Destructive
                </Button>
              </View>
            </View>
            
            <View style={styles.componentRow}>
              <View style={styles.componentItem}>
                <Label color="#374151">Loading</Label>
                <Button loading={isLoading} onPress={() => setIsLoading(true)}>
                  Loading
                </Button>
              </View>
              <View style={styles.componentItem}>
                <Label color="#374151">Disabled</Label>
                <Button disabled onPress={() => {}}>
                  Disabled
                </Button>
              </View>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Input Components */}
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Input Components</H3>
          <BodySmall color="#6b7280">Form inputs with consistent spacing</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.componentGrid}>
            <View style={styles.componentItem}>
              <Label color="#374151">Standard Input</Label>
              <Input placeholder="Inserisci testo..." />
            </View>
            <View style={styles.componentItem}>
              <Label color="#374151">Input with Error</Label>
              <Input variant="error" placeholder="Input con errore" />
            </View>
            <View style={styles.componentItem}>
              <Label color="#374151">TextArea</Label>
              <TextArea placeholder="Inserisci testo lungo..." />
            </View>
            <View style={styles.componentItem}>
              <Label color="#374151">TextArea with Error</Label>
              <TextArea variant="error" placeholder="TextArea con errore" />
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Selection Components */}
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Selection Components</H3>
          <BodySmall color="#6b7280">Checkboxes, radios, switches, and toggles</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.componentGrid}>
            <View style={styles.componentItem}>
              <Label color="#374151">Checkbox</Label>
              <Checkbox
                checked={checkboxChecked}
                onCheckedChange={setCheckboxChecked}
                label="Accetta termini"
              />
            </View>
            <View style={styles.componentItem}>
              <Label color="#374151">Switch</Label>
              <Switch
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
                label="Notifiche"
              />
            </View>
            <View style={styles.componentItem}>
              <Label color="#374151">Toggle</Label>
              <Toggle
                pressed={togglePressed}
                onPressedChange={setTogglePressed}
                label="Modalità scura"
              />
            </View>
            <View style={styles.componentItem}>
              <Label color="#374151">Radio Group</Label>
              <RadioGroup
                options={[
                  { value: 'option1', label: 'Opzione 1' },
                  { value: 'option2', label: 'Opzione 2' },
                ]}
                value={radioValue}
                onValueChange={setRadioValue}
              />
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Interactive Components */}
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Interactive Components</H3>
          <BodySmall color="#6b7280">Sliders, tooltips, and dialogs</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.componentGrid}>
            <View style={styles.componentItem}>
              <Label color="#374151">Slider</Label>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                showValue
              />
            </View>
            <View style={styles.componentItem}>
              <Label color="#374151">Tooltip</Label>
              <Tooltip content="Questo è un tooltip di esempio">
                <Button variant="outline">Hover per tooltip</Button>
              </Tooltip>
            </View>
            <View style={styles.componentItem}>
              <Label color="#374151">Dialog</Label>
              <Button onPress={() => setDialogOpen(true)}>
                Apri Dialog
              </Button>
              <Dialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title="Conferma"
                description="Sei sicuro di voler procedere?"
              >
                <View style={styles.dialogActions}>
                  <Button variant="outline" onPress={() => setDialogOpen(false)}>
                    Annulla
                  </Button>
                  <Button onPress={() => setDialogOpen(false)}>
                    Conferma
                  </Button>
                </View>
              </Dialog>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Display Components */}
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Display Components</H3>
          <BodySmall color="#6b7280">Avatars, badges, and skeletons</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.componentGrid}>
            <View style={styles.componentItem}>
              <Label color="#374151">Avatar Sizes</Label>
              <View style={styles.avatarRow}>
                <Avatar size="sm" fallback="JD" />
                <Avatar size="md" fallback="JD" />
                <Avatar size="lg" fallback="JD" />
              </View>
            </View>
            <View style={styles.componentItem}>
              <Label color="#374151">Badge</Label>
              <Badge variant="default">Badge</Badge>
            </View>
            <View style={styles.componentItem}>
              <Label color="#374151">Skeleton</Label>
              <Skeleton style={styles.skeletonDemo} />
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );

  const renderFormsSection = () => (
    <View style={styles.section}>
      <H2 color="#1f2937">Forms & Validation</H2>
      
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Form Layout</H3>
          <BodySmall color="#6b7280">Complete form examples with 8pt spacing</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.formDemo}>
            <View style={styles.formField}>
              <Label color="#374151">Nome completo</Label>
              <Input placeholder="Inserisci il tuo nome" />
            </View>
            
            <View style={styles.formField}>
              <Label color="#374151">Email</Label>
              <Input placeholder="Inserisci la tua email" />
            </View>
            
            <View style={styles.formField}>
              <Label color="#374151">Messaggio</Label>
              <TextArea placeholder="Inserisci il tuo messaggio" />
            </View>
            
            <View style={styles.formField}>
              <Checkbox
                checked={checkboxChecked}
                onCheckedChange={setCheckboxChecked}
                label="Accetto i termini e condizioni"
              />
            </View>
            
            <View style={styles.formActions}>
              <Button variant="outline" onPress={() => {}}>
                Annulla
              </Button>
              <Button onPress={() => {}}>
                Invia
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );

  const renderFeedbackSection = () => (
    <View style={styles.section}>
      <H2 color="#1f2937">Feedback & Status</H2>
      
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Status Indicators</H3>
          <BodySmall color="#6b7280">Success, warning, error, and info states</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.statusDemo}>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: '#10b981' }]} />
              <Body color="#374151">Success / Completato</Body>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: '#f59e0b' }]} />
              <Body color="#374151">Warning / Attenzione</Body>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: '#ef4444' }]} />
              <Body color="#374151">Error / Errore</Body>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: '#3b82f6' }]} />
              <Body color="#374151">Info / Informazione</Body>
            </View>
          </View>
        </CardContent>
      </Card>

      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Notifications</H3>
          <BodySmall color="#6b7280">Toast notifications and badges</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.notificationDemo}>
            <View style={styles.notificationItem}>
              <Ionicons name="notifications" size={24} color="#1e3a8a" />
              {notificationCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Text>
                </View>
              )}
            </View>
            
            <View style={styles.toastContainer}>
              <View style={styles.toastItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text style={styles.toastText}>Operazione completata con successo!</Text>
              </View>
              <View style={[styles.toastItem, styles.toastWarning]}>
                <Ionicons name="warning" size={20} color="#f59e0b" />
                <Text style={styles.toastText}>Attenzione: sessione in scadenza</Text>
              </View>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );

  const renderNavigationSection = () => (
    <View style={styles.section}>
      <H2 color="#1f2937">Navigation</H2>
      
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Tabs</H3>
          <BodySmall color="#6b7280">Horizontal and vertical tab navigation</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.tabsContainer}>
            <View style={styles.tabsRow}>
              {['Profilo', 'Impostazioni', 'Aiuto'].map((tab, index) => (
                <Pressable
                  key={tab}
                  style={[
                    styles.tabItem,
                    selectedTab === `tab${index + 1}` && styles.activeTabItem
                  ]}
                  onPress={() => setSelectedTab(`tab${index + 1}`)}
                >
                  <Text style={[
                    styles.tabItemText,
                    selectedTab === `tab${index + 1}` && styles.activeTabItemText
                  ]}>
                    {tab}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );

  const renderDataDisplaySection = () => (
    <View style={styles.section}>
      <H2 color="#1f2937">Data Display</H2>
      
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Progress Indicators</H3>
          <BodySmall color="#6b7280">Linear and circular progress</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.progressDemo}>
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Completamento Profilo</Text>
                <Text style={styles.progressPercentage}>75%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '75%' }]} />
              </View>
            </View>
          </View>
        </CardContent>
      </Card>

      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Carousel</H3>
          <BodySmall color="#6b7280">Content carousel with indicators</BodySmall>
        </CardHeader>
        <CardContent>
          <Carousel
            items={[
              {
                id: '1',
                title: 'Slide 1',
                content: <Text style={styles.carouselText}>Contenuto slide 1</Text>,
              },
              {
                id: '2',
                title: 'Slide 2',
                content: <Text style={styles.carouselText}>Contenuto slide 2</Text>,
              },
              {
                id: '3',
                title: 'Slide 3',
                content: <Text style={styles.carouselText}>Contenuto slide 3</Text>,
              },
            ]}
            showIndicators
            showArrows
          />
        </CardContent>
      </Card>

      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Accordion</H3>
          <BodySmall color="#6b7280">Expandable content sections</BodySmall>
        </CardHeader>
        <CardContent>
          <Accordion
            items={[
              {
                id: '1',
                title: 'Sezione 1',
                content: 'Contenuto della sezione 1. Questo è un esempio di testo che può essere molto lungo.',
              },
              {
                id: '2',
                title: 'Sezione 2',
                content: 'Contenuto della sezione 2. Altro esempio di contenuto espandibile.',
              },
              {
                id: '3',
                title: 'Sezione 3',
                content: 'Contenuto della sezione 3. Ultimo esempio di contenuto.',
              },
            ]}
          />
        </CardContent>
      </Card>
    </View>
  );

  const renderUserCardsSection = () => (
    <View style={styles.section}>
      <H2 color="#1f2937">User Cards & Layouts</H2>
      
      <Card style={styles.componentCard}>
        <CardHeader>
          <H3 color="#1f2937">Stats Cards</H3>
          <BodySmall color="#6b7280">Dashboard statistics with 8pt spacing</BodySmall>
        </CardHeader>
        <CardContent>
          <View style={styles.statsGrid}>
                         <Card style={StyleSheet.flatten([styles.statCard, styles.blueCard])}>
               <CardContent style={styles.statCardContent}>
                 <View style={styles.statCardInner}>
                   <View>
                     <Text style={[styles.statLabel, styles.blueLabel]}>Sessioni Rimanenti</Text>
                     <Text style={[styles.statValue, styles.blueValue]}>8</Text>
                   </View>
                   <View style={[styles.statIcon, styles.blueIcon]}>
                     <Ionicons name="calendar" size={24} color="white" />
                   </View>
                 </View>
               </CardContent>
             </Card>

             <Card style={StyleSheet.flatten([styles.statCard, styles.tealCard])}>
               <CardContent style={styles.statCardContent}>
                 <View style={styles.statCardInner}>
                   <View>
                     <Text style={[styles.statLabel, styles.tealLabel]}>Sessioni Completate</Text>
                     <Text style={[styles.statValue, styles.tealValue]}>4</Text>
                   </View>
                   <View style={[styles.statIcon, styles.tealIcon]}>
                     <Ionicons name="heart" size={24} color="white" />
                   </View>
                 </View>
               </CardContent>
             </Card>
          </View>
        </CardContent>
      </Card>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'design-system':
        return renderDesignSystemSection();
      case 'typography':
        return renderTypographySection();
      case 'components':
        return renderComponentsSection();
      case 'forms':
        return renderFormsSection();
      case 'feedback':
        return renderFeedbackSection();
      case 'navigation':
        return renderNavigationSection();
      case 'data-display':
        return renderDataDisplaySection();
      case 'user-cards':
        return renderUserCardsSection();
      default:
        return renderDesignSystemSection();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBackToHome} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </Pressable>
        <H1 color="#1f2937">Design System</H1>
        <View style={styles.headerSpacer} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              style={[
                styles.tabButton,
                activeTab === tab.id && styles.activeTabButton
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons
                name={tab.icon as any}
                size={16}
                color={activeTab === tab.id ? '#3b82f6' : '#6b7280'}
              />
              <Text style={[
                styles.tabButtonText,
                activeTab === tab.id && styles.activeTabButtonText
              ]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Layout - 8pt Grid
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerSpacer: {
    width: 40,
  },
  tabNavigation: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: '#3b82f6',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  componentCard: {
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },

  // Design System
  spacingDemo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'flex-end',
  },
  spacingItem: {
    alignItems: 'center',
    gap: 8,
  },
  spacingBox: {
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  spacingLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  colorPalette: {
    gap: 24,
  },
  colorSection: {
    gap: 8,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 16,
  },
  colorItem: {
    alignItems: 'center',
    gap: 4,
  },
  colorSwatch: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  colorName: {
    fontSize: 12,
    color: '#6b7280',
  },
  borderRadiusDemo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  borderRadiusItem: {
    alignItems: 'center',
    gap: 8,
  },
  borderRadiusBox: {
    width: 64,
    height: 64,
    backgroundColor: '#3b82f6',
  },
  borderRadiusLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  shadowDemo: {
    flexDirection: 'row',
    gap: 16,
  },
  shadowItem: {
    alignItems: 'center',
    gap: 8,
  },
  shadowBox: {
    width: 64,
    height: 64,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shadowLabel: {
    fontSize: 12,
    color: '#6b7280',
  },

  // Typography
  typographyDemo: {
    gap: 24,
  },
  typographySection: {
    gap: 8,
  },

  // Components
  componentGrid: {
    gap: 24,
  },
  componentRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  componentItem: {
    minWidth: 200,
    gap: 8,
  },
  avatarRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  skeletonDemo: {
    width: 200,
    height: 100,
  },
  carouselText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
  dialogActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
    marginTop: 16,
  },

  // Forms
  formDemo: {
    gap: 16,
  },
  formField: {
    gap: 8,
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
    marginTop: 8,
  },

  // Feedback
  statusDemo: {
    gap: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  notificationDemo: {
    gap: 16,
  },
  notificationItem: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#0d9488',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  toastContainer: {
    gap: 8,
  },
  toastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
  },
  toastWarning: {
    backgroundColor: '#fffbeb',
  },
  toastText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },

  // Navigation
  tabsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tabsRow: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  activeTabItem: {
    backgroundColor: '#eff6ff',
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
  },
  tabItemText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabItemText: {
    color: '#3b82f6',
    fontWeight: '600',
  },

  // Data Display
  progressDemo: {
    gap: 16,
  },
  progressContainer: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: '#374151',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
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

  // User Cards
  statsGrid: {
    gap: 16,
  },
  statCard: {
    borderWidth: 1,
  },
  blueCard: {
    borderColor: '#bfdbfe',
    backgroundColor: '#eff6ff',
  },
  tealCard: {
    borderColor: '#99f6e4',
    backgroundColor: '#f0fdfa',
  },
  statCardContent: {
    padding: 24,
  },
  statCardInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  blueLabel: {
    color: '#1d4ed8',
  },
  tealLabel: {
    color: '#0f766e',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  blueValue: {
    color: '#1e3a8a',
  },
  tealValue: {
    color: '#134e4a',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueIcon: {
    backgroundColor: '#3b82f6',
  },
  tealIcon: {
    backgroundColor: '#14b8a6',
  },
});