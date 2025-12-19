# Mapbox Migration Summary

## Why Mapbox Instead of Google Maps?

The application now uses **Mapbox Geocoding API** instead of Google Maps for the following reasons:

### Advantages of Mapbox

1. **Free Tier**
   - 100,000 free geocoding requests per month
   - No credit card required
   - No billing setup needed

2. **Simple Setup**
   - Just need an access token
   - No complex API enabling process
   - No project creation required

3. **Cost-Effective**
   - Google Maps Geocoding API requires billing
   - Mapbox is completely free for most use cases
   - Better for personal projects and MVPs

4. **Excellent Quality**
   - Accurate worldwide geocoding
   - Comprehensive address parsing
   - Supports reverse geocoding

## What Changed

### Files Updated

1. **`app/api/addresses/verify/route.ts`**
   - Changed from Google Geocoding API to Mapbox Geocoding API
   - Updated response parsing for Mapbox format
   - Changed environment variable from `GOOGLE_MAPS_API_KEY` to `MAPBOX_ACCESS_TOKEN`

2. **`app/api/addresses/geolocation/route.ts`**
   - Changed reverse geocoding from Google to Mapbox
   - Updated coordinate format (Mapbox uses [longitude, latitude])
   - Changed environment variable

3. **`.env.example`**
   - Replaced `GOOGLE_MAPS_API_KEY` with `MAPBOX_ACCESS_TOKEN`
   - Added link to Mapbox account page

4. **Documentation Files**
   - `SETUP.md` - Updated setup instructions for Mapbox
   - `README.md` - Updated to mention Mapbox
   - `BUILD_SUMMARY.md` - Updated API references
   - `DEPLOYMENT_CHECKLIST.md` - Updated environment variables

## How to Get a Mapbox Token

1. Visit https://account.mapbox.com/ and sign up for free
2. Navigate to https://account.mapbox.com/access-tokens/
3. Copy your default public token (or create a new one)
4. Add to your `.env.local` file:
   ```env
   MAPBOX_ACCESS_TOKEN=your_token_here
   ```

## API Differences

### Request Format

**Google Maps:**
```
https://maps.googleapis.com/maps/api/geocode/json?address={query}&key={key}
```

**Mapbox:**
```
https://api.mapbox.com/geocoding/v5/mapbox.places/{query}.json?access_token={token}
```

### Coordinate Format for Reverse Geocoding

**Google Maps:**
- Format: `latitude,longitude`
- Example: `40.7128,-74.0060`

**Mapbox:**
- Format: `longitude,latitude` (reversed!)
- Example: `-74.0060,40.7128`

### Response Structure

Both APIs return similar data, but the structure differs:

**Google Maps Response:**
- Uses `address_components` array with `types`
- Provides `formatted_address`
- Coordinates in `geometry.location`

**Mapbox Response:**
- Uses `context` array for address components
- Provides `place_name` (equivalent to formatted address)
- Coordinates in `center` array [lng, lat]

## Implementation Details

### Address Component Parsing

The app extracts address components from Mapbox's `context` array:

```typescript
const getContext = (type: string) => {
  return result.context?.find((ctx) => ctx.id.startsWith(type));
};

const city = getContext("place")?.text;
const state = getContext("region")?.text;
const postalCode = getContext("postcode")?.text;
const country = getContext("country")?.text;
```

### Coordinate Handling

Mapbox returns coordinates as `[longitude, latitude]`, so we access them as:

```typescript
latitude: result.center[1].toString(),
longitude: result.center[0].toString(),
```

## No Code Changes Required for Frontend

The frontend components (`AddressSearchForm`, `AddressVerificationResult`, etc.) don't need any changes because the API endpoints maintain the same response format. The conversion happens entirely in the backend API routes.

## Testing

After switching to Mapbox, test:

1. **Address Verification**
   - Enter various addresses (US and international)
   - Verify postal codes are correct
   - Check formatted address display

2. **Geolocation**
   - Click "Use My Location"
   - Verify address is accurately determined
   - Test in different locations

3. **Saved Addresses**
   - Save verified addresses
   - Verify all components are stored correctly
   - Test with international addresses

## Free Tier Limits

**Mapbox Free Tier:**
- 100,000 geocoding requests per month
- 50,000 map loads per month
- No credit card required
- Automatic rate limiting

**Monitoring Usage:**
Visit https://account.mapbox.com/ to track your API usage.

## Migration Checklist

If you were using Google Maps before:

- [ ] Remove `GOOGLE_MAPS_API_KEY` from `.env.local`
- [ ] Get Mapbox access token
- [ ] Add `MAPBOX_ACCESS_TOKEN` to `.env.local`
- [ ] Restart development server
- [ ] Test address verification
- [ ] Test geolocation
- [ ] Update production environment variables

## Support

For Mapbox-specific issues:
- Mapbox Documentation: https://docs.mapbox.com/
- API Reference: https://docs.mapbox.com/api/search/geocoding/
- Account Dashboard: https://account.mapbox.com/

## Benefits Summary

| Feature | Google Maps | Mapbox |
|---------|-------------|--------|
| **Free Tier** | Requires billing | 100,000 requests/month |
| **Credit Card** | Required | Not required |
| **Setup Complexity** | High (enable APIs, billing) | Low (just token) |
| **Geocoding Quality** | Excellent | Excellent |
| **International Support** | Excellent | Excellent |
| **Cost for Overages** | $5/1000 requests | $0.50/1000 requests |

## Conclusion

Switching to Mapbox provides a better developer experience, especially for personal projects and MVPs. The free tier is more than sufficient for most applications, and the setup is much simpler than Google Maps.
