import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    pdf,
} from '@react-pdf/renderer';
import { AttachmentResult, attachmentStyles } from '@/lib/data/attachment-styles';
import { getPairingKey, pairingAnalyses, getStrategiesForPairing } from '@/lib/data/pairing-analysis';

interface AssessmentData {
    coupleId?: string;
    partnerName: string;
    answers: Record<number, number>;
    result: AttachmentResult;
    completedAt: string;
}

// PDF Styles - Clinical & Academic
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        fontFamily: 'Times-Roman', // Standard serif font
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingBottom: 10,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    headerTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold', // Sans-serif for headers is common in reports
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    headerMeta: {
        fontSize: 8,
        fontFamily: 'Courier',
        textAlign: 'right',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Times-Bold',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        marginBottom: 20,
        color: '#444444',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        borderBottomWidth: 0.5,
        borderBottomColor: '#cccccc',
        paddingBottom: 4,
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    subheading: {
        fontSize: 10,
        fontFamily: 'Times-Bold',
        marginBottom: 4,
        marginTop: 8,
    },
    text: {
        fontSize: 10,
        fontFamily: 'Times-Roman',
        lineHeight: 1.5,
        marginBottom: 8,
        textAlign: 'justify',
    },
    dataRow: {
        flexDirection: 'row',
        marginBottom: 4,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eeeeee',
        paddingBottom: 2,
    },
    dataLabel: {
        width: 120,
        fontSize: 9,
        fontFamily: 'Courier-Bold',
        textTransform: 'uppercase',
    },
    dataValue: {
        flex: 1,
        fontSize: 9,
        fontFamily: 'Courier',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: '#000000',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 8,
        fontFamily: 'Courier',
    },
    box: {
        borderWidth: 1,
        borderColor: '#000000',
        padding: 10,
        marginBottom: 15,
    },
    list: {
        marginLeft: 15,
    },
    listItem: {
        fontSize: 10,
        fontFamily: 'Times-Roman',
        marginBottom: 4,
    }
});

const RelationshipReport = ({ partner1, partner2 }: { partner1: AssessmentData; partner2?: AssessmentData }) => {
    const name1 = partner1.partnerName;
    const name2 = partner2?.partnerName;
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const refId = partner1.coupleId || Math.random().toString(36).substring(7).toUpperCase();

    const style1 = partner1.result.style;
    const styleInfo1 = attachmentStyles[style1];

    const style2 = partner2?.result.style;
    const styleInfo2 = style2 ? attachmentStyles[style2] : null;

    const pairingKey = style2 ? getPairingKey(style1, style2) : null;
    const pairingAnalysis = pairingKey ? pairingAnalyses[pairingKey] : null;
    const strategies = style2 ? getStrategiesForPairing(style1, style2) : null;

    return (
        <Document>
            {/* Page 1: Clinical Summary */}
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Confidential Diagnostic Report</Text>
                        <Text style={{ fontSize: 8, fontFamily: 'Helvetica', marginTop: 4 }}>Clinical Attachment Labs</Text>
                    </View>
                    <View>
                        <Text style={styles.headerMeta}>REF: {refId}</Text>
                        <Text style={styles.headerMeta}>DATE: {date}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Dyadic Attachment Analysis</Text>
                    <Text style={styles.subtitle}>
                        SUBJECT A: {name1.toUpperCase()} {name2 ? `| SUBJECT B: ${name2.toUpperCase()}` : ''}
                    </Text>
                </View>

                <View style={styles.box}>
                    <Text style={{ fontSize: 9, fontFamily: 'Courier-Bold', marginBottom: 8 }}>EXECUTIVE SUMMARY</Text>
                    <Text style={styles.text}>
                        This report contains a clinical analysis of attachment patterns and relational dynamics.
                        The data indicates specific behavioral tendencies that influence emotional regulation and interpersonal connection.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Subject A Profile: {name1}</Text>
                    <View style={styles.dataRow}>
                        <Text style={styles.dataLabel}>Classification</Text>
                        <Text style={styles.dataValue}>{styleInfo1.name.toUpperCase()}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.dataLabel}>Anxiety Scale</Text>
                        <Text style={styles.dataValue}>{partner1.result.anxietyLevel.toUpperCase()}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.dataLabel}>Avoidance Scale</Text>
                        <Text style={styles.dataValue}>{partner1.result.avoidanceLevel.toUpperCase()}</Text>
                    </View>
                    <Text style={[styles.text, { marginTop: 10 }]}>{styleInfo1.description}</Text>
                </View>

                {partner2 && styleInfo2 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Subject B Profile: {name2}</Text>
                        <View style={styles.dataRow}>
                            <Text style={styles.dataLabel}>Classification</Text>
                            <Text style={styles.dataValue}>{styleInfo2.name.toUpperCase()}</Text>
                        </View>
                        <View style={styles.dataRow}>
                            <Text style={styles.dataLabel}>Anxiety Scale</Text>
                            <Text style={styles.dataValue}>{partner2.result.anxietyLevel.toUpperCase()}</Text>
                        </View>
                        <View style={styles.dataRow}>
                            <Text style={styles.dataLabel}>Avoidance Scale</Text>
                            <Text style={styles.dataValue}>{partner2.result.avoidanceLevel.toUpperCase()}</Text>
                        </View>
                        <Text style={[styles.text, { marginTop: 10 }]}>{styleInfo2.description}</Text>
                    </View>
                )}

                <View style={styles.footer}>
                    <Text style={styles.footerText}>CONFIDENTIAL - FOR AUTHORIZED USE ONLY</Text>
                    <Text style={styles.footerText}>PAGE 1 OF {partner2 ? '3' : '2'}</Text>
                </View>
            </Page>

            {/* Page 2: Pairing Analysis (if partner 2 exists) */}
            {partner2 && pairingAnalysis && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Interaction Dynamics</Text>
                        <Text style={styles.headerMeta}>REF: {refId}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.title}>{pairingAnalysis.summary}</Text>
                        <Text style={styles.subtitle}>
                            {styleInfo1.name} + {styleInfo2?.name} Configuration
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Clinical Synthesis</Text>
                        <Text style={styles.text}>{pairingAnalysis.dynamics}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Conflict Vectors</Text>
                        {pairingAnalysis.keyConflicts.map((conflict, i) => (
                            <View key={i} style={{ flexDirection: 'row', marginBottom: 4 }}>
                                <Text style={{ fontSize: 10, fontFamily: 'Courier', width: 20 }}>{i + 1}.</Text>
                                <Text style={styles.listItem}>{conflict}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Relational Strengths</Text>
                        {pairingAnalysis.strengths.map((strength, i) => (
                            <View key={i} style={{ flexDirection: 'row', marginBottom: 4 }}>
                                <Text style={{ fontSize: 10, fontFamily: 'Courier', width: 20 }}>{i + 1}.</Text>
                                <Text style={styles.listItem}>{strength}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>CONFIDENTIAL - FOR AUTHORIZED USE ONLY</Text>
                        <Text style={styles.footerText}>PAGE 2 OF 3</Text>
                    </View>
                </Page>
            )}

            {/* Page 3: Strategies */}
            {strategies && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Intervention Protocol</Text>
                        <Text style={styles.headerMeta}>REF: {refId}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Subject A Protocol ({name1})</Text>
                        {strategies.forPartner1.slice(0, 2).map((strategy) => (
                            <View key={strategy.id} style={{ marginBottom: 15 }}>
                                <Text style={styles.subheading}>{strategy.title}</Text>
                                <Text style={styles.text}>{strategy.description}</Text>
                                <View style={{ marginLeft: 10, marginTop: 4 }}>
                                    {strategy.howTo.slice(0, 2).map((step, i) => (
                                        <Text key={i} style={{ fontSize: 9, fontFamily: 'Courier', marginBottom: 2 }}>
                                            &gt; {step}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>

                    {partner2 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Subject B Protocol ({name2})</Text>
                            {strategies.forPartner2.slice(0, 2).map((strategy) => (
                                <View key={strategy.id} style={{ marginBottom: 15 }}>
                                    <Text style={styles.subheading}>{strategy.title}</Text>
                                    <Text style={styles.text}>{strategy.description}</Text>
                                    <View style={{ marginLeft: 10, marginTop: 4 }}>
                                        {strategy.howTo.slice(0, 2).map((step, i) => (
                                            <Text key={i} style={{ fontSize: 9, fontFamily: 'Courier', marginBottom: 2 }}>
                                                &gt; {step}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {partner2 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Dyadic Protocol (Joint)</Text>
                            {strategies.forCouple.slice(0, 2).map((strategy) => (
                                <View key={strategy.id} style={{ marginBottom: 15 }}>
                                    <Text style={styles.subheading}>{strategy.title}</Text>
                                    <Text style={styles.text}>{strategy.description}</Text>
                                    <View style={{ marginLeft: 10, marginTop: 4 }}>
                                        {strategy.howTo.slice(0, 2).map((step, i) => (
                                            <Text key={i} style={{ fontSize: 9, fontFamily: 'Courier', marginBottom: 2 }}>
                                                &gt; {step}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>CONFIDENTIAL - FOR AUTHORIZED USE ONLY</Text>
                        <Text style={styles.footerText}>PAGE {partner2 ? '3 OF 3' : '2 OF 2'}</Text>
                    </View>
                </Page>
            )}
        </Document>
    );
};

export async function generateRelationshipPdf(
    partner1: AssessmentData,
    partner2?: AssessmentData
): Promise<void> {
    const blob = await pdf(<RelationshipReport partner1={partner1} partner2={partner2} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CLINICAL_REPORT_${partner1.coupleId || 'INDIVIDUAL'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
