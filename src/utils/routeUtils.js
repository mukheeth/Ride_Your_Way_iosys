/**
 * Generate waypoints that simulate following roads
 * This creates intermediate points along a route that follow a more realistic path
 */
export function generateRoadWaypoints(pickup, dropoff, numWaypoints = 20) {
    const waypoints = [];
    const [pickupLat, pickupLng] = pickup;
    const [dropoffLat, dropoffLng] = dropoff;
    
    // Calculate total distance
    const latDiff = dropoffLat - pickupLat;
    const lngDiff = dropoffLng - pickupLng;
    
    // Generate waypoints with slight curves to simulate road following
    for (let i = 0; i <= numWaypoints; i++) {
        const progress = i / numWaypoints;
        
        // Use easing function for smoother movement
        const easedProgress = easeInOutCubic(progress);
        
        // Base interpolation
        let lat = pickupLat + latDiff * easedProgress;
        let lng = pickupLng + lngDiff * easedProgress;
        
        // Add slight curves to simulate road following
        // Create a sine wave pattern that simulates road turns
        const curveIntensity = 0.002; // Adjust for more/less curve
        const curveFrequency = 3; // Number of curves along the route
        
        // Perpendicular offset to create road-like curves
        const perpendicularLat = -lngDiff * Math.sin(progress * Math.PI * curveFrequency) * curveIntensity;
        const perpendicularLng = latDiff * Math.sin(progress * Math.PI * curveFrequency) * curveIntensity;
        
        lat += perpendicularLat;
        lng += perpendicularLng;
        
        waypoints.push([lat, lng]);
    }
    
    return waypoints;
}

/**
 * Easing function for smooth acceleration and deceleration
 */
function easeInOutCubic(t) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Calculate distance between two points in kilometers
 */
export function calculateDistance(point1, point2) {
    const [lat1, lng1] = point1;
    const [lat2, lng2] = point2;
    
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Get the current waypoint index based on progress
 */
export function getCurrentWaypointIndex(waypoints, progress) {
    return Math.min(
        Math.floor(progress * (waypoints.length - 1)),
        waypoints.length - 1
    );
}

/**
 * Interpolate between two waypoints for smooth movement
 */
export function interpolateWaypoints(waypoints, progress) {
    if (waypoints.length === 0) return null;
    if (waypoints.length === 1) return waypoints[0];
    
    const totalProgress = progress * (waypoints.length - 1);
    const index = Math.floor(totalProgress);
    const localProgress = totalProgress - index;
    
    if (index >= waypoints.length - 1) {
        return waypoints[waypoints.length - 1];
    }
    
    const [lat1, lng1] = waypoints[index];
    const [lat2, lng2] = waypoints[index + 1];
    
    // Linear interpolation between waypoints
    const lat = lat1 + (lat2 - lat1) * localProgress;
    const lng = lng1 + (lng2 - lng1) * localProgress;
    
    return [lat, lng];
}

