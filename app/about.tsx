import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

// Responsive dimensions
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 414;
const isLargeDevice = width >= 414;

// Responsive font sizes
const getResponsiveSize = (small: number, medium: number, large: number) => {
  if (isSmallDevice) return small;
  if (isMediumDevice) return medium;
  return large;
};

// Responsive spacing
const getResponsiveSpacing = (small: number, medium: number, large: number) => {
  if (isSmallDevice) return small;
  if (isMediumDevice) return medium;
  return large;
};
const AnimatedView = Animated.View;

// Animated Particle Component
const AnimatedParticle = ({ delay, style }: { delay: number; style: any }) => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 2000,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -10,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  return (
    <AnimatedView
      style={[
        style,
        {
          opacity,
          transform: [{ scale }, { translateY }],
        },
      ]}
    />
  );
};

// Modern Robot Structure Component
const WireframeFigure = () => {
  const centerPulse = React.useRef(new Animated.Value(1)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const circuitGlow = React.useRef(new Animated.Value(0.3)).current;
  const nodeGlow = React.useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Center pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(centerPulse, {
          toValue: 1.15,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(centerPulse, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();

    // Circuit glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(circuitGlow, {
          toValue: 0.9,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(circuitGlow, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Node glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(nodeGlow, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(nodeGlow, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.robotContainer}>
      {/* Outer rotating ring */}
      <Animated.View
        style={[
          styles.outerRing,
          {
            transform: [{ rotate }],
          },
        ]}
      >
        <View style={styles.ringSegment1} />
        <View style={styles.ringSegment2} />
        <View style={styles.ringSegment3} />
        <View style={styles.ringSegment4} />
      </Animated.View>

      {/* Central core with pulse */}
      <AnimatedView
        style={[
          styles.centralCore,
          {
            transform: [{ scale: centerPulse }],
          },
        ]}
      >
        <View style={styles.coreInner} />
        <View style={styles.coreCenter} />
      </AnimatedView>

      {/* Circuit nodes */}
      <Animated.View style={[styles.node1, { opacity: nodeGlow }]} />
      <Animated.View style={[styles.node2, { opacity: nodeGlow }]} />
      <Animated.View style={[styles.node3, { opacity: nodeGlow }]} />
      <Animated.View style={[styles.node4, { opacity: nodeGlow }]} />
      <Animated.View style={[styles.node5, { opacity: nodeGlow }]} />
      <Animated.View style={[styles.node6, { opacity: nodeGlow }]} />

      {/* Connecting lines */}
      <Animated.View style={[styles.connectLine1, { opacity: circuitGlow }]} />
      <Animated.View style={[styles.connectLine2, { opacity: circuitGlow }]} />
      <Animated.View style={[styles.connectLine3, { opacity: circuitGlow }]} />
      <Animated.View style={[styles.connectLine4, { opacity: circuitGlow }]} />
      <Animated.View style={[styles.connectLine5, { opacity: circuitGlow }]} />
      <Animated.View style={[styles.connectLine6, { opacity: circuitGlow }]} />

      {/* Geometric shapes */}
      <View style={styles.geometricShape1} />
      <View style={styles.geometricShape2} />
      <View style={styles.geometricShape3} />
    </View>
  );
};

// Animated Card Component
const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <AnimatedView
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      {children}
    </AnimatedView>
  );
};

// Animated Icon Component
const AnimatedIcon = ({ name, label, delay, onPress }: { name: string; label: string; delay: number; onPress?: () => void }) => {
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const glowAnim = React.useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Continuous rotation for gear icon
    if (name === 'settings') {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
    }

    // Glow pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          delay,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.5,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const content = (
    <View style={styles.techItem}>
      <View style={styles.iconContainer}>
        <AnimatedView
          style={[
            styles.iconGlow,
            {
              opacity: glowAnim,
            },
          ]}
        />
        <Animated.View
          style={{
            transform: [{ rotate }],
          }}
        >
          <MaterialIcons name={name as any} size={45} color="#00BFFF" />
        </Animated.View>
      </View>
      <Text style={styles.techLabel}>{label}</Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

// AI Detail Page Component
const AIDetailPage = ({ onBack }: { onBack: () => void }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background Particles */}
      <View style={styles.backgroundParticles}>
        {[...Array(20)].map((_, i) => (
          <AnimatedParticle
            key={i}
            delay={i * 100}
            style={[
              styles.backgroundParticle,
              {
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              },
            ]}
          />
        ))}
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <AnimatedView
          style={[
            styles.backButtonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={28} color="#00BFFF" />
          </TouchableOpacity>
        </AnimatedView>

        {/* AI Header */}
        <AnimatedCard delay={200}>
          <View style={styles.aiHeader}>
            <MaterialIcons name="psychology" size={60} color="#00BFFF" />
            <Text style={styles.aiTitle}>Artificial Intelligence</Text>
            <Text style={styles.aiSubtitle}>Transforming Industries with Intelligent Solutions</Text>
          </View>
        </AnimatedCard>

        {/* AI Details */}
        <AnimatedCard delay={400}>
          <Text style={styles.sectionTitle}>About Artificial Intelligence</Text>
          <Text style={styles.detailParagraph}>
            At Kamarta Robotics, we leverage cutting-edge Artificial Intelligence technologies to create intelligent robotic systems that can learn, adapt, and make autonomous decisions. Our AI solutions combine machine learning, deep learning, and neural networks to solve complex industrial challenges.
          </Text>
          <Text style={[styles.detailParagraph, styles.paragraphMargin]}>
            Our AI-powered robots are capable of:
          </Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Real-time decision making and problem solving</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Adaptive learning from environmental changes</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Computer vision and image recognition</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Natural language processing capabilities</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Predictive maintenance and analytics</Text>
            </View>
          </View>
        </AnimatedCard>

        {/* Internship Section */}
        <AnimatedCard delay={600}>
          <Text style={styles.sectionTitle}>Internship Opportunities</Text>
          <Text style={styles.detailParagraph}>
            We offer exciting internship opportunities for students and professionals passionate about Artificial Intelligence and Robotics. Join us to work on real-world projects and gain hands-on experience with cutting-edge AI technologies.
          </Text>
          
          <Text style={[styles.subsectionTitle, styles.subsectionMargin]}>Internship Programs:</Text>
          
          <View style={styles.internshipCard}>
            <MaterialIcons name="school" size={30} color="#00BFFF" />
            <Text style={styles.internshipTitle}>AI Research Intern</Text>
            <Text style={styles.internshipText}>
              Work on advanced AI algorithms, machine learning models, and neural network architectures. Duration: 3-6 months
            </Text>
          </View>

          <View style={styles.internshipCard}>
            <MaterialIcons name="code" size={30} color="#00BFFF" />
            <Text style={styles.internshipTitle}>AI Development Intern</Text>
            <Text style={styles.internshipText}>
              Develop AI applications, integrate AI solutions with robotic systems, and work on real-world projects. Duration: 3-6 months
            </Text>
          </View>

          <View style={styles.internshipCard}>
            <MaterialIcons name="analytics" size={30} color="#00BFFF" />
            <Text style={styles.internshipTitle}>Data Science Intern</Text>
            <Text style={styles.internshipText}>
              Analyze data, build predictive models, and work on AI-driven analytics solutions. Duration: 3-6 months
            </Text>
          </View>

          <Text style={[styles.subsectionTitle, styles.subsectionMargin]}>Benefits:</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <MaterialIcons name="star" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Hands-on experience with cutting-edge AI technologies</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="star" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Mentorship from industry experts</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="star" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Certificate of completion</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="star" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Potential for full-time opportunities</Text>
            </View>
          </View>

          <Text style={[styles.subsectionTitle, styles.subsectionMargin]}>How to Apply:</Text>
          <Text style={styles.detailParagraph}>
            Send your resume and cover letter to contact@kamarta.in with the subject line "AI Internship Application". Please mention your area of interest and preferred duration.
          </Text>
        </AnimatedCard>
      </ScrollView>
    </View>
  );
};

// Precision Engineering Detail Page Component
const PrecisionEngineeringDetailPage = ({ onBack }: { onBack: () => void }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background Particles */}
      <View style={styles.backgroundParticles}>
        {[...Array(20)].map((_, i) => (
          <AnimatedParticle
            key={i}
            delay={i * 100}
            style={[
              styles.backgroundParticle,
              {
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              },
            ]}
          />
        ))}
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <AnimatedView
          style={[
            styles.backButtonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={28} color="#00BFFF" />
          </TouchableOpacity>
        </AnimatedView>

        {/* Precision Engineering Header */}
        <AnimatedCard delay={200}>
          <View style={styles.aiHeader}>
            <MaterialIcons name="settings" size={60} color="#00BFFF" />
            <Text style={styles.aiTitle}>Precision Engineering</Text>
            <Text style={styles.aiSubtitle}>Excellence in Design and Manufacturing</Text>
          </View>
        </AnimatedCard>

        {/* Precision Engineering Details */}
        <AnimatedCard delay={400}>
          <Text style={styles.sectionTitle}>About Precision Engineering</Text>
          <Text style={styles.detailParagraph}>
            At Kamarta Robotics, Precision Engineering is at the core of everything we build. We combine advanced manufacturing techniques, meticulous design processes, and cutting-edge materials to create robotic systems with unparalleled accuracy and reliability.
          </Text>
          <Text style={[styles.detailParagraph, styles.paragraphMargin]}>
            Our precision engineering capabilities include:
          </Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Micro-level accuracy in component manufacturing</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Advanced CAD/CAM design and simulation</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Quality control and testing protocols</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Custom fabrication and prototyping</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Material science and optimization</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Tolerance analysis and dimensional control</Text>
            </View>
          </View>
        </AnimatedCard>

        {/* Internship Section */}
        <AnimatedCard delay={600}>
          <Text style={styles.sectionTitle}>Internship Opportunities</Text>
          <Text style={styles.detailParagraph}>
            Join our Precision Engineering team to work on real-world projects involving advanced manufacturing, design optimization, and quality assurance. Gain hands-on experience with state-of-the-art tools and technologies.
          </Text>
          
          <Text style={[styles.subsectionTitle, styles.subsectionMargin]}>Internship Programs:</Text>
          
          <View style={styles.internshipCard}>
            <MaterialIcons name="engineering" size={30} color="#00BFFF" />
            <Text style={styles.internshipTitle}>Mechanical Design Intern</Text>
            <Text style={styles.internshipText}>
              Work on CAD modeling, structural analysis, and design optimization for robotic components. Duration: 3-6 months
            </Text>
          </View>

          <View style={styles.internshipCard}>
            <MaterialIcons name="precision-manufacturing" size={30} color="#00BFFF" />
            <Text style={styles.internshipTitle}>Manufacturing Engineering Intern</Text>
            <Text style={styles.internshipText}>
              Learn advanced manufacturing processes, CNC programming, and quality control systems. Duration: 3-6 months
            </Text>
          </View>

          <View style={styles.internshipCard}>
            <MaterialIcons name="science" size={30} color="#00BFFF" />
            <Text style={styles.internshipTitle}>Materials Engineering Intern</Text>
            <Text style={styles.internshipText}>
              Research and develop new materials, conduct material testing, and optimize material selection. Duration: 3-6 months
            </Text>
          </View>

          <Text style={[styles.subsectionTitle, styles.subsectionMargin]}>Benefits:</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <MaterialIcons name="star" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Hands-on experience with advanced manufacturing equipment</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="star" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Work on real industrial projects</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="star" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Certificate of completion</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="star" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Potential for full-time opportunities</Text>
            </View>
          </View>

          <Text style={[styles.subsectionTitle, styles.subsectionMargin]}>How to Apply:</Text>
          <Text style={styles.detailParagraph}>
            Send your resume and cover letter to contact@kamarta.in with the subject line "Precision Engineering Internship Application". Please mention your area of interest and preferred duration.
          </Text>
        </AnimatedCard>
      </ScrollView>
    </View>
  );
};

// Autonomous Systems Detail Page Component
const AutonomousSystemsDetailPage = ({ onBack }: { onBack: () => void }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background Particles */}
      <View style={styles.backgroundParticles}>
        {[...Array(20)].map((_, i) => (
          <AnimatedParticle
            key={i}
            delay={i * 100}
            style={[
              styles.backgroundParticle,
              {
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              },
            ]}
          />
        ))}
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <AnimatedView
          style={[
            styles.backButtonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={28} color="#00BFFF" />
          </TouchableOpacity>
        </AnimatedView>

        {/* Autonomous Systems Header */}
        <AnimatedCard delay={200}>
          <View style={styles.aiHeader}>
            <MaterialIcons name="hub" size={60} color="#00BFFF" />
            <Text style={styles.aiTitle}>Autonomous Systems</Text>
            <Text style={styles.aiSubtitle}>Self-Navigating Robots for the Future</Text>
          </View>
        </AnimatedCard>

        {/* Autonomous Systems Details */}
        <AnimatedCard delay={400}>
          <Text style={styles.sectionTitle}>About Autonomous Systems</Text>
          <Text style={styles.detailParagraph}>
            Our Autonomous Systems division develops self-navigating robots capable of operating independently in complex environments. These systems combine advanced sensors, real-time processing, and intelligent decision-making to perform tasks without human intervention.
          </Text>
          <Text style={[styles.detailParagraph, styles.paragraphMargin]}>
            Our autonomous systems feature:
          </Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Advanced sensor fusion and perception systems</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Real-time path planning and obstacle avoidance</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>SLAM (Simultaneous Localization and Mapping) technology</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Multi-robot coordination and swarm intelligence</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Adaptive control systems</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Remote monitoring and fleet management</Text>
            </View>
          </View>
        </AnimatedCard>

        {/* Internship Section */}
        <AnimatedCard delay={600}>
          <Text style={styles.sectionTitle}>Internship Opportunities</Text>
          <Text style={styles.detailParagraph}>
            Work on cutting-edge autonomous systems projects and contribute to the development of next-generation self-navigating robots. Gain experience in robotics, control systems, and sensor integration.
          </Text>
          
          <Text style={[styles.subsectionTitle, styles.subsectionMargin]}>Internship Programs:</Text>
          
          <View style={styles.internshipCard}>
            <MaterialIcons name="navigation" size={30} color="#00BFFF" />
            <Text style={styles.internshipTitle}>Autonomous Navigation Intern</Text>
            <Text style={styles.internshipText}>
              Develop path planning algorithms, work on SLAM systems, and implement obstacle avoidance. Duration: 3-6 months
            </Text>
          </View>

          <View style={styles.internshipCard}>
            <MaterialIcons name="sensors" size={30} color="#00BFFF" />
            <Text style={styles.internshipTitle}>Sensor Integration Intern</Text>
            <Text style={styles.internshipText}>
              Integrate various sensors (LiDAR, cameras, IMU), work on sensor fusion, and develop perception systems. Duration: 3-6 months
            </Text>
          </View>

          <View style={styles.internshipCard}>
            <MaterialIcons name="memory" size={30} color="#00BFFF" />
            <Text style={styles.internshipTitle}>Control Systems Intern</Text>
            <Text style={styles.internshipText}>
              Design and implement control algorithms, work on robot dynamics, and optimize system performance. Duration: 3-6 months
            </Text>
          </View>

          <Text style={[styles.subsectionTitle, styles.subsectionMargin]}>Benefits:</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <MaterialIcons name="star" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Work on real autonomous robot projects</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="star" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Learn from robotics experts</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="star" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Certificate of completion</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="star" size={20} color="#00BFFF" />
              <Text style={styles.featureText}>Potential for full-time opportunities</Text>
            </View>
          </View>

          <Text style={[styles.subsectionTitle, styles.subsectionMargin]}>How to Apply:</Text>
          <Text style={styles.detailParagraph}>
            Send your resume and cover letter to contact@kamarta.in with the subject line "Autonomous Systems Internship Application". Please mention your area of interest and preferred duration.
          </Text>
        </AnimatedCard>
      </ScrollView>
    </View>
  );
};

// Main Page Component
export default function AboutUsPage() {
  const [showAIDetail, setShowAIDetail] = React.useState(false);
  const [showPrecisionDetail, setShowPrecisionDetail] = React.useState(false);
  const [showAutonomousDetail, setShowAutonomousDetail] = React.useState(false);
  const headerFade = React.useRef(new Animated.Value(0)).current;
  const headerSlide = React.useRef(new Animated.Value(-50)).current;
  const figureFade = React.useRef(new Animated.Value(0)).current;
  const figureScale = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (!showAIDetail && !showPrecisionDetail && !showAutonomousDetail) {
      // Header animation
      Animated.parallel([
        Animated.timing(headerFade, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(headerSlide, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      // Figure animation
      Animated.parallel([
        Animated.timing(figureFade, {
          toValue: 1,
          duration: 1200,
          delay: 300,
          useNativeDriver: true,
        }),
        Animated.spring(figureScale, {
          toValue: 1,
          delay: 300,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showAIDetail, showPrecisionDetail, showAutonomousDetail]);

  if (showAIDetail) {
    return <AIDetailPage onBack={() => setShowAIDetail(false)} />;
  }

  if (showPrecisionDetail) {
    return <PrecisionEngineeringDetailPage onBack={() => setShowPrecisionDetail(false)} />;
  }

  if (showAutonomousDetail) {
    return <AutonomousSystemsDetailPage onBack={() => setShowAutonomousDetail(false)} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Animated Background Particles */}
      <View style={styles.backgroundParticles}>
        {[...Array(20)].map((_, i) => (
          <AnimatedParticle
            key={i}
            delay={i * 100}
            style={[
              styles.backgroundParticle,
              {
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              },
            ]}
          />
        ))}
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Header Section - Redesigned */}
        <AnimatedView
          style={[
            styles.headerContainer,
            {
              opacity: headerFade,
              transform: [{ translateY: headerSlide }],
            },
          ]}
        >
          <View style={styles.headerGradient}>
            <View style={styles.headerGlow} />
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <View style={styles.logoIconContainer}>
                <MaterialIcons name="precision-manufacturing" size={getResponsiveSize(40, 50, 60)} color="#00BFFF" />
              </View>
              <View style={styles.logoTextContainer}>
                <Text style={[styles.logoText, { fontSize: getResponsiveSize(28, 36, 42) }]}>
                  Kamarta<Text style={[styles.registeredSymbol, { fontSize: getResponsiveSize(18, 22, 26) }]}>®</Text>
                </Text>
                <Text style={[styles.logoTextRobotics, { fontSize: getResponsiveSize(24, 32, 38) }]}>Robotics</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <Text style={[styles.tagline, { fontSize: getResponsiveSize(12, 14, 16) }]}>
              Technology and Automation Pvt Ltd
            </Text>
            {/* Animated Glowing particles */}
            <AnimatedParticle delay={0} style={styles.particle1} />
            <AnimatedParticle delay={200} style={styles.particle2} />
            <AnimatedParticle delay={400} style={styles.particle3} />
            <AnimatedParticle delay={600} style={styles.particle4} />
            <AnimatedParticle delay={800} style={styles.particle5} />
            <AnimatedParticle delay={1000} style={styles.particle6} />
          </View>
        </AnimatedView>

        {/* Animated Central Wireframe Figure */}
        <AnimatedView
          style={[
            styles.figureContainer,
            {
              opacity: figureFade,
              transform: [{ scale: figureScale }],
            },
          ]}
        >
          <WireframeFigure />
        </AnimatedView>

        {/* Animated About Us Section */}
        <AnimatedCard delay={600}>
          <Text style={styles.cardTitle}>About Us</Text>
          <Text style={styles.cardText}>
            To innovate and lead the field for Robotics and creating solutions that transform industries globally.
          </Text>
          <Text style={[styles.cardText, styles.cardTextMargin]}>
            To empower the future through Intelligent technology, fostering a world of efficiency, safety, and endless possibilities.
          </Text>
        </AnimatedCard>

        {/* Animated Core Technologies Section */}
        <AnimatedCard delay={800}>
          <Text style={styles.cardTitle}>Core Technologies</Text>
          <View style={styles.techContainer}>
            <AnimatedIcon 
              name="psychology" 
              label="Artificial Intelligence" 
              delay={0} 
              onPress={() => setShowAIDetail(true)}
            />
            <AnimatedIcon 
              name="settings" 
              label="Precision Engineering" 
              delay={200}
              onPress={() => setShowPrecisionDetail(true)}
            />
            <AnimatedIcon 
              name="hub" 
              label="Autonomous Systems" 
              delay={400}
              onPress={() => setShowAutonomousDetail(true)}
            />
          </View>
        </AnimatedCard>

        {/* Animated Corporate Details Section */}
        <AnimatedCard delay={1000}>
          <Text style={styles.cardTitle}>Corporate Details</Text>
          <Text style={styles.detailText}>Established: 2021</Text>
          <Text style={styles.detailText}>Headquarter: Gurugram Sector 44 Plot No 94 Maneshar , Gurugram</Text>
          <Text style={styles.detailText}>Founders: Ms. Swati Shukla</Text>
        </AnimatedCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1a2e',
  },
  backgroundParticles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  backgroundParticle: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#00BFFF',
    opacity: 0.3,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingBottom: getResponsiveSpacing(30, 35, 40),
    paddingHorizontal: getResponsiveSpacing(12, 16, 20),
  },
  headerContainer: {
    marginTop: getResponsiveSpacing(30, 40, 50),
    marginBottom: getResponsiveSpacing(15, 18, 20),
    paddingHorizontal: getResponsiveSpacing(15, 18, 20),
    zIndex: 2,
  },
  headerGradient: {
    backgroundColor: '#1a3a5c',
    padding: getResponsiveSpacing(20, 25, 30),
    borderRadius: getResponsiveSpacing(16, 20, 24),
    alignItems: 'center',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 212, 255, 0.4)',
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  headerGlow: {
    position: 'absolute',
    width: '200%',
    height: '200%',
    backgroundColor: '#00BFFF',
    opacity: 0.1,
    borderRadius: 100,
    top: -50,
    left: -50,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: getResponsiveSpacing(12, 15, 18),
    zIndex: 1,
  },
  logoIconContainer: {
    marginRight: getResponsiveSpacing(12, 15, 18),
    padding: getResponsiveSpacing(8, 10, 12),
    borderRadius: getResponsiveSpacing(15, 18, 20),
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  logoTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  logoText: {
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'left',
    zIndex: 1,
    letterSpacing: getResponsiveSpacing(1, 1.5, 2),
    textShadowColor: '#00BFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    lineHeight: getResponsiveSize(32, 42, 48),
  },
  logoTextRobotics: {
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: -getResponsiveSpacing(4, 5, 6),
    zIndex: 1,
    letterSpacing: getResponsiveSpacing(1, 1.2, 1.5),
    textShadowColor: '#00BFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    lineHeight: getResponsiveSize(28, 36, 42),
  },
  registeredSymbol: {
    verticalAlign: 'top',
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: 'rgba(0, 212, 255, 0.3)',
    marginVertical: getResponsiveSpacing(10, 12, 15),
    borderRadius: 1,
  },
  tagline: {
    color: '#FFFFFF',
    opacity: 0.95,
    textAlign: 'center',
    zIndex: 1,
    letterSpacing: getResponsiveSpacing(0.3, 0.5, 0.7),
    fontWeight: '400',
  },
  particle1: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#00BFFF',
    top: 15,
    left: 30,
  },
  particle2: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00BFFF',
    top: 25,
    right: 40,
  },
  particle3: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00BFFF',
    bottom: 20,
    left: 50,
  },
  particle4: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00BFFF',
    top: 40,
    left: 60,
  },
  particle5: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#00BFFF',
    top: 50,
    right: 30,
  },
  particle6: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#00BFFF',
    bottom: 30,
    right: 50,
  },
  figureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: getResponsiveSpacing(18, 20, 24),
    height: getResponsiveSize(220, 260, 320),
    zIndex: 2,
  },
  robotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getResponsiveSize(200, 240, 280),
    height: getResponsiveSize(200, 240, 280),
    position: 'relative',
  },
  outerRing: {
    position: 'absolute',
    width: getResponsiveSize(180, 220, 260),
    height: getResponsiveSize(180, 220, 260),
    borderRadius: getResponsiveSize(90, 110, 130),
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: '#00BFFF',
    borderRightColor: '#00BFFF',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  ringSegment1: {
    position: 'absolute',
    width: getResponsiveSize(180, 220, 260),
    height: 3,
    backgroundColor: '#00BFFF',
    top: 0,
    left: 0,
    opacity: 0.6,
  },
  ringSegment2: {
    position: 'absolute',
    width: 3,
    height: getResponsiveSize(180, 220, 260),
    backgroundColor: '#00BFFF',
    right: 0,
    top: 0,
    opacity: 0.6,
  },
  ringSegment3: {
    position: 'absolute',
    width: getResponsiveSize(180, 220, 260),
    height: 3,
    backgroundColor: '#00BFFF',
    bottom: 0,
    left: 0,
    opacity: 0.3,
  },
  ringSegment4: {
    position: 'absolute',
    width: 3,
    height: getResponsiveSize(180, 220, 260),
    backgroundColor: '#00BFFF',
    left: 0,
    top: 0,
    opacity: 0.3,
  },
  centralCore: {
    position: 'absolute',
    width: getResponsiveSize(80, 100, 120),
    height: getResponsiveSize(80, 100, 120),
    borderRadius: getResponsiveSize(40, 50, 60),
    borderWidth: 4,
    borderColor: '#00BFFF',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  coreInner: {
    width: getResponsiveSize(50, 65, 80),
    height: getResponsiveSize(50, 65, 80),
    borderRadius: getResponsiveSize(25, 32.5, 40),
    borderWidth: 2,
    borderColor: '#00BFFF',
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
  },
  coreCenter: {
    position: 'absolute',
    width: getResponsiveSize(20, 25, 30),
    height: getResponsiveSize(20, 25, 30),
    borderRadius: getResponsiveSize(10, 12.5, 15),
    backgroundColor: '#00BFFF',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  node1: {
    position: 'absolute',
    width: getResponsiveSize(12, 15, 18),
    height: getResponsiveSize(12, 15, 18),
    borderRadius: getResponsiveSize(6, 7.5, 9),
    backgroundColor: '#00BFFF',
    top: getResponsiveSize(20, 25, 30),
    left: getResponsiveSize(20, 25, 30),
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  node2: {
    position: 'absolute',
    width: getResponsiveSize(12, 15, 18),
    height: getResponsiveSize(12, 15, 18),
    borderRadius: getResponsiveSize(6, 7.5, 9),
    backgroundColor: '#00BFFF',
    top: getResponsiveSize(20, 25, 30),
    right: getResponsiveSize(20, 25, 30),
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  node3: {
    position: 'absolute',
    width: getResponsiveSize(12, 15, 18),
    height: getResponsiveSize(12, 15, 18),
    borderRadius: getResponsiveSize(6, 7.5, 9),
    backgroundColor: '#00BFFF',
    bottom: getResponsiveSize(20, 25, 30),
    left: getResponsiveSize(20, 25, 30),
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  node4: {
    position: 'absolute',
    width: getResponsiveSize(12, 15, 18),
    height: getResponsiveSize(12, 15, 18),
    borderRadius: getResponsiveSize(6, 7.5, 9),
    backgroundColor: '#00BFFF',
    bottom: getResponsiveSize(20, 25, 30),
    right: getResponsiveSize(20, 25, 30),
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  node5: {
    position: 'absolute',
    width: getResponsiveSize(10, 12, 14),
    height: getResponsiveSize(10, 12, 14),
    borderRadius: getResponsiveSize(5, 6, 7),
    backgroundColor: '#00BFFF',
    top: '50%',
    left: getResponsiveSize(10, 12, 15),
    marginTop: getResponsiveSize(-5, -6, -7),
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  node6: {
    position: 'absolute',
    width: getResponsiveSize(10, 12, 14),
    height: getResponsiveSize(10, 12, 14),
    borderRadius: getResponsiveSize(5, 6, 7),
    backgroundColor: '#00BFFF',
    top: '50%',
    right: getResponsiveSize(10, 12, 15),
    marginTop: getResponsiveSize(-5, -6, -7),
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  connectLine1: {
    position: 'absolute',
    width: getResponsiveSize(50, 60, 70),
    height: 2,
    backgroundColor: '#00BFFF',
    top: getResponsiveSize(30, 35, 40),
    left: getResponsiveSize(30, 35, 40),
    transform: [{ rotate: '45deg' }],
  },
  connectLine2: {
    position: 'absolute',
    width: getResponsiveSize(50, 60, 70),
    height: 2,
    backgroundColor: '#00BFFF',
    top: getResponsiveSize(30, 35, 40),
    right: getResponsiveSize(30, 35, 40),
    transform: [{ rotate: '-45deg' }],
  },
  connectLine3: {
    position: 'absolute',
    width: getResponsiveSize(50, 60, 70),
    height: 2,
    backgroundColor: '#00BFFF',
    bottom: getResponsiveSize(30, 35, 40),
    left: getResponsiveSize(30, 35, 40),
    transform: [{ rotate: '-45deg' }],
  },
  connectLine4: {
    position: 'absolute',
    width: getResponsiveSize(50, 60, 70),
    height: 2,
    backgroundColor: '#00BFFF',
    bottom: getResponsiveSize(30, 35, 40),
    right: getResponsiveSize(30, 35, 40),
    transform: [{ rotate: '45deg' }],
  },
  connectLine5: {
    position: 'absolute',
    width: getResponsiveSize(40, 50, 60),
    height: 2,
    backgroundColor: '#00BFFF',
    top: '50%',
    left: getResponsiveSize(20, 25, 30),
    marginTop: -1,
    transform: [{ rotate: '90deg' }],
  },
  connectLine6: {
    position: 'absolute',
    width: getResponsiveSize(40, 50, 60),
    height: 2,
    backgroundColor: '#00BFFF',
    top: '50%',
    right: getResponsiveSize(20, 25, 30),
    marginTop: -1,
    transform: [{ rotate: '90deg' }],
  },
  geometricShape1: {
    position: 'absolute',
    width: getResponsiveSize(30, 40, 50),
    height: getResponsiveSize(30, 40, 50),
    borderWidth: 2,
    borderColor: '#00BFFF',
    backgroundColor: 'transparent',
    top: getResponsiveSize(10, 15, 20),
    left: getResponsiveSize(10, 15, 20),
    transform: [{ rotate: '45deg' }],
    opacity: 0.5,
  },
  geometricShape2: {
    position: 'absolute',
    width: getResponsiveSize(25, 35, 45),
    height: getResponsiveSize(25, 35, 45),
    borderWidth: 2,
    borderColor: '#00BFFF',
    backgroundColor: 'transparent',
    bottom: getResponsiveSize(10, 15, 20),
    right: getResponsiveSize(10, 15, 20),
    transform: [{ rotate: '45deg' }],
    opacity: 0.5,
  },
  geometricShape3: {
    position: 'absolute',
    width: getResponsiveSize(20, 25, 30),
    height: getResponsiveSize(20, 25, 30),
    borderRadius: getResponsiveSize(10, 12.5, 15),
    borderWidth: 2,
    borderColor: '#00BFFF',
    backgroundColor: 'transparent',
    top: '50%',
    left: '50%',
    marginTop: getResponsiveSize(-10, -12.5, -15),
    marginLeft: getResponsiveSize(-10, -12.5, -15),
    opacity: 0.4,
  },
  card: {
    backgroundColor: '#0f2a42',
    marginHorizontal: getResponsiveSpacing(15, 18, 20),
    marginBottom: getResponsiveSpacing(20, 22, 25),
    padding: getResponsiveSpacing(18, 22, 25),
    borderRadius: getResponsiveSpacing(16, 18, 20),
    borderWidth: 1.5,
    borderColor: '#00BFFF',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 5,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: getResponsiveSize(20, 22, 24),
    fontWeight: 'bold',
    color: '#00BFFF',
    marginBottom: getResponsiveSpacing(12, 15, 18),
    letterSpacing: 0.5,
    textShadowColor: '#00BFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  cardText: {
    fontSize: getResponsiveSize(13, 14, 15),
    color: '#FFFFFF',
    lineHeight: getResponsiveSize(20, 22, 24),
    opacity: 0.95,
    letterSpacing: 0.3,
  },
  cardTextMargin: {
    marginTop: getResponsiveSpacing(12, 14, 15),
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getResponsiveSpacing(12, 14, 16),
    width: '100%',
  },
  techItem: {
    alignItems: 'center',
    flex: isSmallDevice ? 0 : 1,
    width: isSmallDevice ? '100%' : '48%',
    marginBottom: getResponsiveSpacing(12, 14, 18),
    paddingHorizontal: getResponsiveSpacing(5, 8, 10),
    alignSelf: isSmallDevice ? 'stretch' : 'center',
  },
  iconContainer: {
    width: getResponsiveSize(90, 95, 110),
    height: getResponsiveSize(90, 95, 110),
    borderRadius: getResponsiveSize(45, 47.5, 55),
    marginBottom: getResponsiveSpacing(10, 12, 14),
    padding: getResponsiveSpacing(12, 14, 16),
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlow: {
    position: 'absolute',
    width: getResponsiveSize(70, 75, 85),
    height: getResponsiveSize(70, 75, 85),
    borderRadius: getResponsiveSize(35, 37.5, 42.5),
    backgroundColor: '#00BFFF',
    alignSelf: 'center',
    top: getResponsiveSpacing(4, 5, 6),
  },
  techLabel: {
    fontSize: getResponsiveSize(12, 13, 14),
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.95,
    fontWeight: '500',
    letterSpacing: 0.3,
    paddingHorizontal: getResponsiveSpacing(5, 8, 10),
  },
  detailText: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 10,
    opacity: 0.95,
    letterSpacing: 0.3,
  },
  backButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0f2a42',
    borderWidth: 1.5,
    borderColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  aiHeader: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  aiTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginTop: 15,
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: '#00BFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  aiSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginBottom: 15,
    letterSpacing: 0.5,
    textShadowColor: '#00BFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  detailParagraph: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 24,
    opacity: 0.95,
    letterSpacing: 0.3,
    marginBottom: 12,
  },
  paragraphMargin: {
    marginTop: 8,
  },
  featureList: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingLeft: 5,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginTop: 20,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  subsectionMargin: {
    marginTop: 25,
  },
  internshipCard: {
    backgroundColor: '#1a3a5c',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  internshipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginTop: 10,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  internshipText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});
