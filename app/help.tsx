import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  interpolate,
  Layout,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// Responsive breakpoints
const getResponsiveValues = (width: number, height: number) => {
  const isSmallMobile = width < 375;
  const isMobile = width >= 375 && width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const isLargeDesktop = width >= 1440;

  return {
    isSmallMobile,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    width,
    height,
    // Responsive multipliers
    scale: isSmallMobile ? 0.85 : isMobile ? 0.95 : isTablet ? 1 : isDesktop ? 1.1 : 1.2,
    fontSize: {
      xs: isSmallMobile ? 10 : isMobile ? 11 : isTablet ? 12 : 13,
      sm: isSmallMobile ? 12 : isMobile ? 13 : isTablet ? 14 : 15,
      base: isSmallMobile ? 14 : isMobile ? 15 : isTablet ? 16 : 17,
      lg: isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 20 : 22,
      xl: isSmallMobile ? 20 : isMobile ? 22 : isTablet ? 24 : 26,
      '2xl': isSmallMobile ? 24 : isMobile ? 28 : isTablet ? 32 : 36,
    },
    spacing: {
      xs: isSmallMobile ? 4 : isMobile ? 6 : isTablet ? 8 : 10,
      sm: isSmallMobile ? 8 : isMobile ? 10 : isTablet ? 12 : 14,
      md: isSmallMobile ? 12 : isMobile ? 16 : isTablet ? 20 : 24,
      lg: isSmallMobile ? 16 : isMobile ? 20 : isTablet ? 24 : 28,
      xl: isSmallMobile ? 20 : isMobile ? 24 : isTablet ? 28 : 32,
    },
    iconSize: {
      sm: isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 20 : 22,
      md: isSmallMobile ? 20 : isMobile ? 22 : isTablet ? 24 : 26,
      lg: isSmallMobile ? 40 : isMobile ? 44 : isTablet ? 48 : 52,
      xl: isSmallMobile ? 48 : isMobile ? 52 : isTablet ? 56 : 60,
    },
  };
};


const faqItems = [
  {
    id: 1,
    category: 'Robots & Products',
    question: 'Do you build custom industrial robots?',
    answer:
      'Yes. Our engineering team designs tailor-made robotic arms, AMRs, and vision systems for manufacturing partners.',
    tags: ['Custom', 'Industrial'],
  },
  {
    id: 2,
    category: 'Robots & Products',
    question: 'Which sectors do your robots serve?',
    answer:
      'We deploy robots for automotive assembly, pharma packaging, electronics testing, logistics picking, and food automation.',
    tags: ['Sectors', 'Applications'],
  },
  {
    id: 3,
    category: 'Robots & Products',
    question: 'How accurate are Kamarta robotic arms?',
    answer:
      'Our flagship arms deliver ±0.02 mm repeatability with adaptive control loops for consistent precision on the shopfloor.',
    tags: ['Precision', 'Technical'],
  },
  {
    id: 4,
    category: 'Robots & Products',
    question: 'Can you integrate AI vision into existing production lines?',
    answer:
      'Absolutely. We retrofit 3D vision, hyperspectral cameras, and Edge AI models that plug into PLCs without long downtimes.',
    tags: ['AI', 'Integration'],
  },
  {
    id: 5,
    category: 'Internships',
    question: 'How can students apply for internships?',
    answer:
      'Submit your resume and portfolio through the Internship Status card. We run 3-month cohorts focused on robotics R&D.',
    tags: ['Application', 'Students'],
  },
  {
    id: 6,
    category: 'Internships',
    question: 'What skills do you expect from interns?',
    answer:
      'We look for fundamentals in control systems, ROS, CAD, embedded C++, or ML along with curiosity to tinker and ship quickly.',
    tags: ['Skills', 'Requirements'],
  },
  {
    id: 7,
    category: 'Internships',
    question: 'Do interns work on real deployments?',
    answer:
      'Yes. Each cohort pairs with a mentor to prototype sub-systems such as gripper kinematics, sensor fusion, or operator dashboards.',
    tags: ['Projects', 'Mentorship'],
  },
  {
    id: 8,
    category: 'Support & Services',
    question: 'Do you provide maintenance for deployed robots?',
    answer:
      'Kamarta Robotics offers 24/7 remote monitoring plus on-site maintenance plans for every deployment.',
    tags: ['Maintenance', 'Support'],
  },
  {
    id: 9,
    category: 'Support & Services',
    question: 'What training do you offer to operators?',
    answer:
      'We deliver bilingual operator training, safety workshops, and digital twins so teams can practice before going live.',
    tags: ['Training', 'Operators'],
  },
  {
    id: 10,
    category: 'Pricing & Plans',
    question: 'Can SMEs afford your robots?',
    answer:
      'We have leasing, robotics-as-a-service, and milestone-based payment plans tailored for small and medium manufacturers.',
    tags: ['Pricing', 'SME'],
  },
  {
    id: 11,
    category: 'Pricing & Plans',
    question: 'How quickly can you deploy a new cell?',
    answer:
      'Standard palletizing cells deploy in 4-6 weeks while highly customized lines can take 10-12 weeks including testing.',
    tags: ['Deployment', 'Timeline'],
  },
  {
    id: 12,
    category: 'Support & Services',
    question: 'Do you help with compliance and certifications?',
    answer:
      'Our safety engineers work with clients on CE, ISO, and BIS compliance plus documentation for audits and insurance.',
    tags: ['Compliance', 'Certifications'],
  },
];

const faqCategories = ['All', 'Robots & Products', 'Internships', 'Support & Services', 'Pricing & Plans'];

const purchaseProcess = [
  {
    title: 'Lock Your Cohort Slot',
    subtitle: 'Choose the intake window that matches your semester timeline',
    description:
      'Tap “How to Purchase Internship”, select the cohort, and fill in your contact, college, and preferred track so we can allocate the right pod.',
    icon: 'calendar',
  },
  {
    title: 'Secure the Internship Pass',
    subtitle: 'Pay through Razorpay with UPI, card, or net banking',
    description:
      'Proceed to the payment gateway, double-check the amount, and keep a screenshot or payment reference ID handy for verification.',
    icon: 'card',
  },
  {
    title: 'Submit Proof & Portfolio',
    subtitle: 'Share your work so mentors can personalize onboarding',
    description:
      'Upload the payment reference along with GitHub/CAD/portfolio links inside the confirmation form to trigger the mentor approval workflow.',
    icon: 'cloud-upload',
  },
  {
    title: 'Get Seat Confirmation',
    subtitle: 'Receive access within 24 hours',
    description:
      'Our mentor desk validates your proof, emails the cohort calendar, and adds you to the communication channels for kickoff prep.',
    icon: 'shield-checkmark',
  },
];

const purchaseChecklist = [
  'Keep your official email and WhatsApp number ready for receipts.',
  'Use a stable internet connection while completing Razorpay checkout.',
  'Have portfolio links or demo videos accessible for the confirmation form.',
  'Check spam/promotions if you do not see the confirmation email.',
];

const contactOptions = [
  {
    title: 'Talk to Sales Engineers',
    description:
      'Call +91 769498544 (Mon-Sat, 10 AM - 7 PM IST) for automation roadmaps and pricing.',
    icon: 'call',
  },
  {
    title: 'Email Robotics Support',
    description:
      'Drop detailed requirements, CAD, or BOM to contact@kamarta.in for a 24-hour response.',
    icon: 'mail',
  },
  {
    title: 'Visit the Experience Lab',
    description:
      'Book an in-person demo at Kamarta Robotics Lab, gurugram sector 44 .',
    icon: 'location',
  },
  {
    title: 'Join Internship Helpdesk',
    description:
      'Message +91 8076230647 on WhatsApp with “Internship” to talk to HR mentors directly.',
    icon: 'logo-whatsapp',
  },
];

const supportHighlights = [
  {
    title: '24/7 Remote Monitoring',
    description: 'Command center engineers trace every robotic cell and push live fixes.',
    icon: 'shield-checkmark',
  },
  {
    title: 'On-Site Deployment Squad',
    description: 'Integration experts travel pan-India to install, calibrate, and certify.',
    icon: 'hardware-chip',
  },
  {
    title: 'Student Mentorship Pods',
    description: 'Interns get design reviews, ROS code walkthroughs, and career clinics.',
    icon: 'school',
  },
];

const helpMethods = [
  {
    title: 'Automation Planning',
    detail: 'Blueprinting throughput, safety layers, and ROI before a single bolt is tightened.',
    icon: 'construct',
  },
  {
    title: 'AI + Vision Tuning',
    detail: 'Custom datasets plus Edge AI deployments for defect detection and guidance.',
    icon: 'eye',
  },
  {
    title: 'Operator Upskilling',
    detail: 'Bilingual workshops, SOP playbooks, and digital twin simulators.',
    icon: 'people',
  },
  {
    title: 'Lifecycle Care',
    detail: 'Spares logistics, predictive maintenance, and upgrade audits every quarter.',
    icon: 'refresh-circle',
  },
];


const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function HelpSupportScreen() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const responsive = useMemo(() => getResponsiveValues(windowWidth, windowHeight), [windowWidth, windowHeight]);
  
  const [currentScreen, setCurrentScreen] = useState<'home' | 'faq' | 'contact' | 'internship'>('home');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [faqSearchResults, setFaqSearchResults] = useState(faqItems);
  const [problemDescription, setProblemDescription] = useState('');

  const headerTitle = useMemo(() => {
    if (currentScreen === 'faq') return 'FAQ & Knowledge Base';
    if (currentScreen === 'contact') return 'Contact Our Team';
    if (currentScreen === 'internship') return 'How to Purchase Internship';
    return 'Help & Support';
  }, [currentScreen]);

  // Animation values
  const scaleAnim = useSharedValue(1);
  const pulseAnim = useSharedValue(1);
  const contactPulseAnim = useSharedValue(1);
  const contactGlowAnim = useSharedValue(0);
  const contactParallaxAnim = useSharedValue(0);
  const internshipHeroAnim = useSharedValue(0);
  const internshipBadgeRotate = useSharedValue(0);
  const processGlowAnim = useSharedValue(0);

  useEffect(() => {
    pulseAnim.value = withRepeat(
      withTiming(1.2, { duration: 1000 }),
      -1,
      true
    );

    // Contact card pulse animation
    contactPulseAnim.value = withRepeat(
      withTiming(1.03, { duration: 1400 }),
      -1,
      true
    );

    // Contact glow animation
    contactGlowAnim.value = withRepeat(
      withTiming(1, { duration: 1600 }),
      -1,
      true
    );

    // Contact parallax animation
    contactParallaxAnim.value = withRepeat(
      withTiming(8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    internshipHeroAnim.value = withRepeat(
      withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    internshipBadgeRotate.value = withRepeat(
      withTiming(360, { duration: 2400, easing: Easing.linear }),
      -1,
      false
    );

    processGlowAnim.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  // Filter FAQ based on search and category
  useEffect(() => {
    let filtered = faqItems;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFaqSearchResults(filtered);
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const animatedContactHeaderStyle = useAnimatedStyle(() => {
    const glow = interpolate(contactGlowAnim.value, [0, 1], [0.35, 0.75]);
    return {
      borderColor: `rgba(0, 191, 255, ${glow})`,
      shadowColor: '#00BFFF',
      shadowOpacity: glow,
      shadowRadius: interpolate(contactGlowAnim.value, [0, 1], [8, 16]),
      transform: [{ translateY: contactParallaxAnim.value * 0.6 }],
    };
  });

  const animatedContactCardStyle = useAnimatedStyle(() => {
    const cardGlow = interpolate(contactGlowAnim.value, [0, 1], [0.3, 0.7]);
    return {
      transform: [{ scale: contactPulseAnim.value }],
      borderColor: `rgba(11, 161, 255, ${cardGlow + 0.3})`,
      shadowColor: '#00BFFF',
      shadowOpacity: cardGlow,
      shadowRadius: interpolate(contactGlowAnim.value, [0, 1], [4, 10]),
    };
  });

  const animatedInternshipHeroStyle = useAnimatedStyle(() => {
    const translateY = interpolate(internshipHeroAnim.value, [0, 1], [0, 10]);
    const glow = interpolate(internshipHeroAnim.value, [0, 1], [0.2, 0.65]);
    return {
      transform: [{ translateY }],
      borderColor: `rgba(89, 205, 255, ${0.4 + glow / 2})`,
      shadowColor: '#59CDFF',
      shadowOpacity: glow,
      shadowRadius: interpolate(internshipHeroAnim.value, [0, 1], [8, 18]),
    };
  });

  const animatedInternshipBadgeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${internshipBadgeRotate.value}deg` },
        { scale: pulseAnim.value },
      ],
    };
  });

  const animatedProcessCardStyle = useAnimatedStyle(() => {
    const glow = interpolate(processGlowAnim.value, [0, 1], [0.2, 0.55]);
    return {
      shadowColor: '#5CF0FF',
      shadowOpacity: glow,
      shadowRadius: interpolate(processGlowAnim.value, [0, 1], [6, 16]),
      borderColor: `rgba(0, 191, 255, ${0.3 + glow / 2})`,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={[
        styles.header,
        responsive.isDesktop && { maxWidth: 1200, alignSelf: 'center', width: '100%', paddingHorizontal: 24 }
      ]}>
        <View style={styles.headerTitleWrap}>
          <Text style={[styles.headerTitle, { fontSize: responsive.fontSize.lg }]}>{headerTitle}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          responsive.isDesktop && { maxWidth: 1200, alignSelf: 'center', width: '100%', paddingHorizontal: 24 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {currentScreen === 'home' && (
          <>
            <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.quickActionsContainer}>
              <AnimatedTouchable
                entering={SlideInRight.delay(300)}
                style={styles.quickActionButton}
                onPress={() => {
                  scaleAnim.value = withSpring(0.95, {}, () => { scaleAnim.value = withSpring(1); });
                  setCurrentScreen('internship');
                }}
              >
                <Text style={[styles.quickActionText, { fontSize: responsive.fontSize.base }]}>How to Purchase Internship</Text>
              </AnimatedTouchable>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(300).duration(500)} style={[
              styles.supportOptionsContainer,
              responsive.isTablet && { flexDirection: 'row' },
              responsive.isDesktop && { flexDirection: 'row', gap: 16 }
            ]}>
              <AnimatedTouchable
                entering={SlideInRight.delay(400)}
                style={[styles.supportBox, { minHeight: responsive.isTablet ? windowHeight * 0.15 : windowHeight * 0.2 }]}
                onPress={() => setCurrentScreen('faq')}
                activeOpacity={0.9}
              >
                <Ionicons name="help-circle" size={responsive.iconSize.xl} color="#FFFFFF" />
                <Text style={[styles.supportBoxText, { fontSize: responsive.fontSize.base }]}>FAQ & Knowledge Base</Text>
              </AnimatedTouchable>

              <AnimatedTouchable
                entering={SlideInRight.delay(500)}
                style={[styles.supportBox, { minHeight: responsive.isTablet ? windowHeight * 0.15 : windowHeight * 0.2 }]}
                onPress={() => setCurrentScreen('contact')}
                activeOpacity={0.9}
              >
                <Ionicons name="mail" size={responsive.iconSize.xl} color="#FFFFFF" />
                <Text style={[styles.supportBoxText, { fontSize: responsive.fontSize.base }]}>Contact Our Team</Text>
              </AnimatedTouchable>
            </Animated.View>

            <View style={styles.capabilitiesSection}>
              <Text style={[styles.sectionLabel, { fontSize: responsive.fontSize.sm }]}>Support we provide</Text>
              {supportHighlights.map((item) => (
                <View key={item.title} style={styles.capabilityCard}>
                  <View style={styles.capabilityIcon}>
                    <Ionicons name={item.icon as any} size={responsive.iconSize.sm} color="#0af" />
                  </View>
                  <View style={styles.capabilityText}>
                    <Text style={[styles.capabilityTitle, { fontSize: responsive.fontSize.base }]}>{item.title}</Text>
                    <Text style={[styles.capabilityDescription, { fontSize: responsive.fontSize.sm }]}>{item.description}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.helpSection}>
              <Text style={[styles.sectionLabel, { fontSize: responsive.fontSize.sm }]}>How we help you</Text>
              {helpMethods.map((method) => (
                <View key={method.title} style={styles.helpRow}>
                  <View style={styles.helpIcon}>
                    <Ionicons name={method.icon as any} size={responsive.iconSize.sm} color="#02192F" />
                  </View>
                  <View style={styles.helpTextBlock}>
                    <Text style={[styles.helpTitle, { fontSize: responsive.fontSize.base }]}>{method.title}</Text>
                    <Text style={[styles.helpDescription, { fontSize: responsive.fontSize.sm }]}>{method.detail}</Text>
                  </View>
                </View>
              ))}
            </View>


          </>
        )}

        {currentScreen === 'faq' && (
          <View style={styles.faqScreenContainer}>
            <Animated.View entering={FadeInDown.duration(500)} style={styles.faqHero}>
              <View style={styles.faqRobotAvatar}>
                <Ionicons name="logo-android" size={responsive.iconSize.lg * 1.2} color="#02192F" />
              </View>
              <View style={styles.faqHeroText}>
                <Text style={[styles.faqHeroTitle, { fontSize: responsive.fontSize.lg }]}>Kamarta Knowledge Droid</Text>
                <Text style={[styles.faqHeroSubtitle, { fontSize: responsive.fontSize.sm }]}>
                  This robot parses support logs, predicts top issues, and stitches curated playbooks from our deployments.
                </Text>
              </View>
            </Animated.View>
            {/* Search Bar */}
            <Animated.View entering={FadeInDown.duration(400)} style={styles.searchContainer}>
              <Ionicons name="search" size={responsive.iconSize.md} color="#00BFFF" style={styles.searchIcon} />
              <TextInput
                style={[styles.searchInput, { fontSize: responsive.fontSize.base }]}
                placeholder="Search FAQs..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                  <Ionicons name="close-circle" size={responsive.iconSize.md} color="#888" />
                </TouchableOpacity>
              )}
            </Animated.View>

            {/* Category Filter */}
            <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.categoryContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScroll}
              >
                {faqCategories.map((category) => (
                  <AnimatedTouchable
                    key={category}
                    entering={SlideInRight.delay(category === 'All' ? 0 : faqCategories.indexOf(category) * 50)}
                    style={[
                      styles.categoryChip,
                      selectedCategory === category && styles.categoryChipActive,
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        selectedCategory === category && styles.categoryChipTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </AnimatedTouchable>
                ))}
              </ScrollView>
            </Animated.View>

            {/* Results Count */}
            <Animated.View entering={FadeIn.delay(200)} style={styles.resultsCount}>
              <Text style={[styles.resultsCountText, { fontSize: responsive.fontSize.sm }]}>
                {faqSearchResults.length} {faqSearchResults.length === 1 ? 'result' : 'results'} found
              </Text>
            </Animated.View>

            {/* FAQ Items */}
            <View style={[
              styles.faqContainer,
              responsive.isTablet && { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
              responsive.isDesktop && { flexDirection: 'row', flexWrap: 'wrap', gap: 20 }
            ]}>
              {faqSearchResults.length > 0 ? (
                faqSearchResults.map((item, index) => {
                  const isExpanded = expandedFaq === item.id;
                  return (
                    <Animated.View
                      key={item.id}
                      entering={FadeInUp.delay(index * 50).duration(400)}
                      layout={Layout.springify()}
                      style={[
                        styles.faqCard,
                        isExpanded && styles.faqCardExpanded,
                        responsive.isTablet && { width: (windowWidth * 0.9 - 32) / 2 },
                        responsive.isDesktop && { width: (windowWidth * 0.9 - 60) / 3 }
                      ]}
                    >
                      <AnimatedTouchable
                        style={styles.faqQuestionRow}
                        onPress={() => toggleFaq(item.id)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.faqQuestionLeft}>
                          <Ionicons name="information-circle" size={responsive.iconSize.md} color="#00BFFF" />
                          <View style={styles.faqQuestionTextContainer}>
                            <Text style={[styles.faqQuestion, { fontSize: responsive.fontSize.base }]}>{item.question}</Text>
                            <View style={styles.faqTagsContainer}>
                              {item.tags.map((tag) => (
                                <View key={tag} style={styles.faqTag}>
                                  <Text style={styles.faqTagText}>{tag}</Text>
                                </View>
                              ))}
                            </View>
                          </View>
                        </View>
                        <Animated.View
                          style={[
                            styles.faqExpandIcon,
                            isExpanded && styles.faqExpandIconRotated,
                          ]}
                        >
                          <Ionicons name="chevron-down" size={responsive.iconSize.md} color="#00BFFF" />
                        </Animated.View>
                      </AnimatedTouchable>

                      {isExpanded && (
                        <Animated.View
                          entering={FadeIn.duration(300)}
                          exiting={FadeOut.duration(200)}
                          style={styles.faqAnswerContainer}
                        >
                          <View style={styles.faqCategoryBadge}>
                            <Ionicons name="folder" size={responsive.iconSize.sm} color="#8ED4FF" />
                            <Text style={[styles.faqCategoryText, { fontSize: responsive.fontSize.xs }]}>{item.category}</Text>
                          </View>
                          <Text style={[styles.faqAnswer, { fontSize: responsive.fontSize.sm }]}>{item.answer}</Text>
                        </Animated.View>
                      )}
                    </Animated.View>
                  );
                })
              ) : (
                <Animated.View entering={FadeIn} style={styles.noResultsContainer}>
                  <Ionicons name="search-outline" size={responsive.iconSize.xl * 1.2} color="#666" />
                  <Text style={[styles.noResultsText, { fontSize: responsive.fontSize.lg }]}>No FAQs found</Text>
                  <Text style={[styles.noResultsSubtext, { fontSize: responsive.fontSize.sm }]}>Try adjusting your search or filter</Text>
                </Animated.View>
              )}
            </View>
          </View>
        )}

        {currentScreen === 'internship' && (
          <View style={styles.internshipContainer}>
            <Animated.View
              entering={FadeInDown.duration(500)}
              style={[styles.internshipHero, animatedInternshipHeroStyle]}
            >
              <View style={styles.internshipHeroHeader}>
                <Animated.View style={[styles.internshipBadge, animatedInternshipBadgeStyle]}>
                  <Ionicons name="sparkles" size={responsive.iconSize.md} color="#02192F" />
                </Animated.View>
                <View style={styles.internshipHeroTitleWrap}>
                  <Text style={[styles.internshipHeroTitle, { fontSize: responsive.fontSize.xl }]}>
                    How to Purchase Internship
                  </Text>
                  <Text style={[styles.internshipHeroSubtitle, { fontSize: responsive.fontSize.base }]}>
                    Follow the steps below to secure your Kamarta internship seat through our guided purchase flow.
                  </Text>
                </View>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(150)} style={[styles.purchaseHelpCard, animatedProcessCardStyle]}>
              <View style={styles.processCardHeader}>
                <View>
                  <Text style={[styles.processCardLabel, { fontSize: responsive.fontSize.sm }]}>Step-by-step flow</Text>
                  <Text style={[styles.processCardTitle, { fontSize: responsive.fontSize.lg }]}>Complete the purchase in minutes</Text>
                </View>
                <View style={styles.processPill}>
                  <Ionicons name="time" size={responsive.iconSize.sm} color="#59CDFF" />
                  <Text style={[styles.processPillText, { fontSize: responsive.fontSize.xs }]}>Avg completion · 5 mins</Text>
                </View>
              </View>

              <View style={styles.processTimeline}>
                {purchaseProcess.map((step, index) => (
                  <View key={step.title} style={styles.processStepRow}>
                    <View style={styles.processStepRail}>
                      <View style={styles.processStepBadge}>
                        <Text style={[styles.processStepBadgeText, { fontSize: responsive.fontSize.sm }]}>{`0${index + 1}`}</Text>
                      </View>
                      {index !== purchaseProcess.length - 1 && <View style={styles.processConnector} />}
                    </View>
                    <View style={styles.processStepContent}>
                      <View style={styles.processStepHeading}>
                        <View style={styles.processIconWrap}>
                          <Ionicons name={step.icon as any} size={responsive.iconSize.md} color="#02192F" />
                        </View>
                        <View style={styles.processStepTextBlock}>
                          <Text style={[styles.processStepTitle, { fontSize: responsive.fontSize.base }]}>{step.title}</Text>
                          <Text style={[styles.processStepSubtitle, { fontSize: responsive.fontSize.sm }]}>{step.subtitle}</Text>
                        </View>
                      </View>
                      <Text style={[styles.processStepDescription, { fontSize: responsive.fontSize.sm }]}>{step.description}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(260)} style={styles.processChecklistCard}>
              <View style={styles.processChecklistHeader}>
                <Text style={[styles.processChecklistTitle, { fontSize: responsive.fontSize.base }]}>Before you submit</Text>
                <Text style={[styles.processChecklistSubtitle, { fontSize: responsive.fontSize.sm }]}>
                  Run through this quick checklist so the transaction and approval stay seamless.
                </Text>
              </View>
              {purchaseChecklist.map((item) => (
                <View key={item} style={styles.processChecklistRow}>
                  <View style={styles.processChecklistBullet}>
                    <Ionicons name="checkmark" size={responsive.iconSize.sm} color="#02192F" />
                  </View>
                  <Text style={[styles.processChecklistText, { fontSize: responsive.fontSize.sm }]}>{item}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.purchaseCTA}>
                <Text style={[styles.purchaseCTAText, { fontSize: responsive.fontSize.base }]}>How to Purchase Internship</Text>
                <Ionicons name="arrow-forward" size={responsive.iconSize.md} color="#02192F" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}

        {currentScreen === 'contact' && (
          <>
            <Animated.View
              entering={FadeInDown.duration(500)}
              style={[styles.contactHeaderContainer, animatedContactHeaderStyle]}
            >
              <View style={[styles.contactBadge, { 
                width: responsive.isTablet ? windowWidth * 0.12 : windowWidth * 0.16,
                height: responsive.isTablet ? windowWidth * 0.12 : windowWidth * 0.16,
              }]}>
                <Ionicons name="people" size={responsive.iconSize.md} color="#02192F" />
              </View>
              <View style={styles.contactHeaderContent}>
                <View style={styles.contactHeaderRow}>
                  <Text style={[styles.contactHeaderTitle, { fontSize: responsive.fontSize.xl }]}>Contact Our Team</Text>
                  <View style={styles.contactStatus}>
                    <View style={styles.contactDot} />
                    <Text style={[styles.contactStatusText, { fontSize: responsive.fontSize.xs }]}>Available 24/7</Text>
                  </View>
                </View>
                <Text style={[styles.contactHeaderMessage, { fontSize: responsive.fontSize.base }]}>
                  Reach out through any channel below. Our robotics experts are ready to assist with
                  automation, internships, and technical support.
                </Text>
                <View style={styles.contactChipRow}>
                  <Text style={[styles.contactChip, { fontSize: responsive.fontSize.xs }]}>Sales</Text>
                  <Text style={[styles.contactChip, { fontSize: responsive.fontSize.xs }]}>Support</Text>
                  <Text style={[styles.contactChip, { fontSize: responsive.fontSize.xs }]}>Internships</Text>
                </View>
              </View>
            </Animated.View>

            <View style={styles.contactContainer}>
              {contactOptions.map((option, index) => (
                <Animated.View
                  key={option.title}
                  entering={FadeInUp.delay(index * 80).duration(400)}
                  style={[styles.contactCard, animatedContactCardStyle]}
                >
                  <View
                    style={[styles.contactIconWrapper, {
                      width: responsive.iconSize.lg,
                      height: responsive.iconSize.lg,
                      borderRadius: responsive.iconSize.lg / 2,
                    }]}
                  >
                    <Ionicons name={option.icon as any} size={responsive.iconSize.md} color="#0af" />
                  </View>
                  <View style={styles.contactTextBlock}>
                    <Text style={[styles.contactTitle, { fontSize: responsive.fontSize.base }]}>{option.title}</Text>
                    <Text style={[styles.contactDescription, { fontSize: responsive.fontSize.sm }]}>{option.description}</Text>
                  </View>
                </Animated.View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 12,
  },
  headerButton: {
    padding: 8,
  },
  headerTitleWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    color: '#8ED4FF',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroLogoCard: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(4, 20, 40, 0.65)',
  },
  heroLogoWord: {
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  heroLogoTagline: {
    color: '#8ED4FF',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00BFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  quickActionText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  supportOptionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  supportBox: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00BFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: Platform.OS === 'android' ? 6 : 0,
    ...(Platform.OS === 'ios' && {
      shadowOpacity: 0.3,
    }),
  },
  supportBoxText: {
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
  capabilitiesSection: {
    marginBottom: 28,
    gap: 14,
  },
  sectionLabel: {
    color: '#8ED4FF',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  capabilityCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(4, 22, 38, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.2)',
  },
  capabilityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 191, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capabilityText: {
    flex: 1,
  },
  capabilityTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  capabilityDescription: {
    color: '#CFE9FF',
    marginTop: 4,
  },
  helpSection: {
    gap: 12,
    marginBottom: 36,
  },
  helpRow: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.15)',
    backgroundColor: 'rgba(3, 12, 22, 0.9)',
  },
  helpIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpTextBlock: {
    flex: 1,
  },
  helpTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  helpDescription: {
    color: '#CFE9FF',
    marginTop: 2,
  },
  problemInputCard: {
    marginTop: 10,
    borderRadius: 24,
    padding: 18,
    backgroundColor: 'rgba(2, 14, 26, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.35)',
    gap: 12,
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  problemInputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  problemPulseWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 191, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  problemPulseDot: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: '#00BFFF',
  },
  problemHeaderText: {
    flex: 1,
  },
  problemInputTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  problemInputSubtitle: {
    color: '#8ED4FF',
    marginTop: 2,
  },
  problemInputWrapper: {
    position: 'relative',
  },
  problemInputGlow: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    left: 2,
    right: 2,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.25)',
  },
  problemInput: {
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.35)',
    borderRadius: 18,
    padding: 14,
    color: '#FFFFFF',
    textAlignVertical: 'top',
    backgroundColor: 'rgba(0, 31, 58, 0.6)',
  },
  problemSubmitButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#00BFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  problemSubmitText: {
    color: '#02192F',
    fontWeight: '700',
  },
  faqScreenContainer: {
    flex: 1,
    gap: 16,
  },
  faqHero: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(3, 18, 32, 0.95)',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.35)',
  },
  faqRobotAvatar: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
  },
  faqHeroText: {
    flex: 1,
    gap: 6,
  },
  faqHeroTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  faqHeroSubtitle: {
    color: '#8ED4FF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 161, 255, 0.1)',
    borderWidth: 2,
    borderColor: '#00BFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    paddingVertical: 4,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  categoryContainer: {
    marginBottom: 8,
  },
  categoryScroll: {
    gap: 10,
    paddingRight: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 191, 255, 0.4)',
    backgroundColor: 'rgba(11, 161, 255, 0.08)',
    marginRight: 10,
  },
  categoryChipActive: {
    borderColor: '#00BFFF',
    backgroundColor: 'rgba(0, 191, 255, 0.2)',
  },
  categoryChipText: {
    color: '#8ED4FF',
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  resultsCount: {
    marginBottom: 8,
  },
  resultsCountText: {
    color: '#8ED4FF',
    fontWeight: '500',
  },
  faqContainer: {
    gap: 12,
    marginBottom: 24,
  },
  faqCard: {
    borderWidth: 1,
    borderColor: '#0ba1ff',
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'rgba(11, 161, 255, 0.08)',
  },
  faqCardExpanded: {
    backgroundColor: 'rgba(11, 161, 255, 0.15)',
    borderColor: '#00BFFF',
    borderWidth: 2,
  },
  faqQuestionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  faqQuestionLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  faqQuestionTextContainer: {
    flex: 1,
    gap: 8,
  },
  faqQuestion: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  faqTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  faqTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 191, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.3)',
  },
  faqTagText: {
    color: '#8ED4FF',
    fontWeight: '500',
  },
  faqExpandIcon: {
    marginTop: 4,
  },
  faqExpandIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  faqAnswerContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 191, 255, 0.2)',
    gap: 12,
  },
  faqCategoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 191, 255, 0.15)',
  },
  faqCategoryText: {
    color: '#8ED4FF',
    fontWeight: '600',
  },
  faqAnswer: {
    color: '#C7E7FF',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 16,
  },
  noResultsText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  noResultsSubtext: {
    color: '#888',
  },
  contactContainer: {
    gap: 14,
    marginBottom: 24,
  },
  contactCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(11, 161, 255, 0.6)',
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'rgba(2, 20, 35, 0.8)',
    gap: 14,
  },
  contactIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#0ba1ff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 161, 255, 0.15)',
  },
  contactTextBlock: {
    flex: 1,
  },
  contactTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 4,
  },
  contactDescription: {
    color: '#C7E7FF',
  },
  contactHeaderContainer: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: 'rgba(3, 15, 28, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.5)',
  },
  contactBadge: {
    borderRadius: 14,
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  contactHeaderContent: {
    flex: 1,
    gap: 10,
  },
  contactHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  contactHeaderTitle: {
    fontWeight: '800',
    color: '#FFFFFF',
  },
  contactStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 191, 255, 0.15)',
  },
  contactDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00BFFF',
  },
  contactStatusText: {
    color: '#8ED4FF',
    fontSize: 12,
    fontWeight: '600',
  },
  contactHeaderMessage: {
    color: '#CFE9FF',
  },
  contactChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  contactChip: {
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.5)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 12,
    color: '#8ED4FF',
  },
  internshipContainer: {
    gap: 18,
  },
  internshipHero: {
    backgroundColor: 'rgba(3, 18, 32, 0.92)',
    borderRadius: 22,
    padding: 20,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 0 },
  },
  internshipHeroHeader: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  internshipHeroTitleWrap: {
    flex: 1,
    gap: 6,
  },
  internshipBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  internshipHeroTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  internshipHeroSubtitle: {
    color: '#CFE9FF',
    marginTop: 6,
  },
  purchaseHelpCard: {
    borderRadius: 20,
    backgroundColor: 'rgba(3, 16, 28, 0.95)',
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.4)',
    gap: 12,
  },
  processCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  processCardLabel: {
    color: '#59CDFF',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  processCardTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  processPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 191, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.4)',
  },
  processPillText: {
    color: '#CFE9FF',
    fontWeight: '600',
  },
  processTimeline: {
    marginTop: 8,
    gap: 18,
  },
  processStepRow: {
    flexDirection: 'row',
    gap: 12,
  },
  processStepRail: {
    alignItems: 'center',
  },
  processStepBadge: {
    width: 34,
    height: 34,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.6)',
    backgroundColor: 'rgba(0, 191, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  processStepBadgeText: {
    color: '#8ED4FF',
    fontWeight: '700',
  },
  processConnector: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(0, 191, 255, 0.35)',
    marginTop: 6,
    marginBottom: 6,
  },
  processStepContent: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(4, 28, 46, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.2)',
    gap: 10,
  },
  processStepHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  processIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  processStepTextBlock: {
    flex: 1,
  },
  processStepTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  processStepSubtitle: {
    color: '#8ED4FF',
    marginTop: 2,
    fontWeight: '600',
  },
  processStepDescription: {
    color: '#CFE9FF',
    lineHeight: 20,
  },
  processChecklistCard: {
    borderRadius: 20,
    backgroundColor: 'rgba(2, 12, 24, 0.92)',
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.25)',
    gap: 12,
  },
  processChecklistHeader: {
    gap: 4,
  },
  processChecklistTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  processChecklistSubtitle: {
    color: '#8ED4FF',
  },
  processChecklistRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  processChecklistBullet: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  processChecklistText: {
    color: '#CFE9FF',
    flex: 1,
  },
  purchaseCTA: {
    marginTop: 6,
    borderRadius: 16,
    backgroundColor: '#00BFFF',
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  purchaseCTAText: {
    color: '#02192F',
    fontWeight: '800',
  },
});
